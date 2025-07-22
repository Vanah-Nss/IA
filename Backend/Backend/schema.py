import graphene
from users.schema import Query as UserQuery, Mutation as UserMutation
# importe d'autres Query et Mutation selon tes apps

class Query(UserQuery, graphene.ObjectType):
    # Ici, on fusionne toutes les queries
    pass

class Mutation(UserMutation, graphene.ObjectType):
    # Ici, on fusionne toutes les mutations
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)
