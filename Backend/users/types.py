import graphene

class ContentInput(graphene.InputObjectType):
    prompt = graphene.String(required=True)
    tone = graphene.String()
    language = graphene.String()
    length = graphene.String()
