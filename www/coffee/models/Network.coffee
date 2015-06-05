class Network
    constructor: (params) ->
        @name = params.name
        @members = (new User(memberParams) for memberParams in params.members)
