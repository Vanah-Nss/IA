import graphene
from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from graphql import GraphQLError
from graphql_jwt.decorators import login_required
import graphql_jwt
import openai
from django.conf import settings
import logging

logger = logging.getLogger(__name__)
User = get_user_model()

# --- TYPES ---

class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ("id", "username", "email", "role")

class ObtainJSONWebTokenWithUser(graphql_jwt.ObtainJSONWebToken):
    user = graphene.Field(UserType)

    @classmethod
    def resolve(cls, root, info, **kwargs):
        result = super().resolve(root, info, **kwargs)
        if result and info.context.user.is_authenticated:
            result.user = info.context.user
        return result

# --- MUTATIONS ---

class Register(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String(required=True)
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    def mutate(self, info, username, email, password):
        if User.objects.filter(username=username).exists():
            raise GraphQLError("Nom d'utilisateur déjà utilisé.")
        if User.objects.filter(email__iexact=email).exists():
            raise GraphQLError("Email déjà utilisé.")

        validate_password(password)

        user = User(username=username, email=email)
        user.set_password(password)
        user.save()

        return Register(user=user)

class SendPasswordResetEmail(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        email = graphene.String(required=True)

    def mutate(self, info, email):
        try:
            user = User.objects.get(email__iexact=email)
        except User.DoesNotExist:
            return SendPasswordResetEmail(success=False)

        token = default_token_generator.make_token(user)
        reset_link = f"http://localhost:5173/reset-password?token={token}&email={email}"

        try:
            send_mail(
                subject="Réinitialisation de mot de passe",
                message=f"Cliquez ici pour réinitialiser votre mot de passe : {reset_link}",
                from_email="noreply@example.com",
                recipient_list=[email],
                fail_silently=False,
            )
        except Exception as e:
            logger.error(f"Erreur email : {e}")
            raise GraphQLError("Erreur d'envoi de mail.")

        return SendPasswordResetEmail(success=True)

class ResetPassword(graphene.Mutation):
    success = graphene.Boolean()

    class Arguments:
        email = graphene.String(required=True)
        token = graphene.String(required=True)
        new_password = graphene.String(required=True)

    def mutate(self, info, email, token, new_password):
        try:
            user = User.objects.get(email__iexact=email)
        except User.DoesNotExist:
            raise GraphQLError("Utilisateur introuvable.")

        if not default_token_generator.check_token(user, token):
            raise GraphQLError("Token invalide ou expiré")

        validate_password(new_password)
        user.set_password(new_password)
        user.save()

        return ResetPassword(success=True)




class GenerateText(graphene.Mutation):
    class Arguments:
        prompt = graphene.String(required=True)
        tone = graphene.String(required=False)
        language = graphene.String(required=False)
        length = graphene.String(required=False)

    result = graphene.String()

    def mutate(self, info, prompt, tone=None, language=None, length=None):
        full_prompt = prompt
        if tone:
            full_prompt += f"\nTone: {tone}"
        if language:
            full_prompt += f"\nLanguage: {language}"
        if length:
            full_prompt += f"\nLength: {length}"

        try:
            # Instanciation du client OpenAI avec ta clé API
            client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)

            # Appel à la nouvelle API chat completions
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": full_prompt}],
                max_tokens=500,
            )
            text_result = response.choices[0].message.content
        except Exception as e:
            text_result = f"Erreur API OpenAI : {str(e)}"

        return GenerateText(result=text_result)


class GenerateImage(graphene.Mutation):
    class Arguments:
        prompt = graphene.String(required=True)

    url = graphene.String()

    def mutate(self, info, prompt):
        try:
            client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)
            response = client.images.generate(
                prompt=prompt,
                n=1,
                size="1024x1024"
            )
            url = response.data[0].url
        except Exception as e:
            url = f"Erreur API OpenAI : {str(e)}"

        return GenerateImage(url=url)



# --- QUERIES & SCHEMA ---

class Query(graphene.ObjectType):
    me = graphene.Field(UserType)

    @login_required
    def resolve_me(self, info):
        return info.context.user

class Mutation(graphene.ObjectType):
    register = Register.Field()
    send_password_reset_email = SendPasswordResetEmail.Field()
    reset_password = ResetPassword.Field()
    generate_text = GenerateText.Field()
    generate_image = GenerateImage.Field()
    tokenAuth = ObtainJSONWebTokenWithUser.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    revoke_token = graphql_jwt.Revoke.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
