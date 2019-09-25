
//
// CREATE COLLECTIONS
//
db.createCollection(
    "Mood",
    {
        autoIndexId: true,
        validator: { 
            $jsonSchema: {
                bsonType: "object",
                required: [ "name", "level" ],
                properties: {
                    name: {
                        bsonType: "string",
                        description: "name of mood"
                    },
                    level: {
                        bsonType: "int",
                        description: "how the mood impacts aspects"
                    }
                }
            }
        }
    }
)

db.createCollection(
    "Aspect",
    {
        autoIndexId: true,
        validator: { 
            $jsonSchema: {
                bsonType: "object",
                required: [ "name", "description" ],
                properties: {
                    name: {
                        bsonType: "string",
                        description: "name of aspect"
                    },
                    description: {
                        bsonType: "string",
                        description: "description for aspect"
                    }
                }
            }
        }
    }
)

db.createCollection(
    "Factor",
    {
        autoIndexId: true,
        validator: { 
            $jsonSchema: {
                bsonType: "object",
                required: [ "description", "affect" ],
                properties: {
                    description: {
                        bsonType: "string",
                        description: "description of factor"
                    },
                    affect: {
                        bsonType: "array",
                        items: {
                            bsonType: "objectId"
                        },
                        description: "id's of the aspects that the factor influences"
                    }
                }
            }
        }
    }
);

db.createCollection(
    "User",
    {
        autoIndexId: true,
        validator: { 
            $jsonSchema: {
                bsonType: "object",
                required: [ "firstName", "lastName", "password", "email"],
                properties: {
                    firstName: {
                        bsonType: "string",
                        description: "first name of the user"
                    },
                    lastName: {
                        bsonType: "string",
                        description: "last name of the user"
                    },
                    password: {
                        bsonType: "string",
                        description: "password of the user"
                    },
                    email: {
                        bsonType: "string",
                        description: "email of the user"
                    },
                    entry: {
                        bsonType: [ "array" ],
                        items: {
                            bsonType: "object",
                            required: [ "dateAdded", "moodID", "factor"],
                            properties: {
                                dateAdded: {
                                    bsonType: "date",
                                    description: "date the entry was submitted"
                                },
                                moodID: {
                                    bsonType: "objectId",
                                    description: "mood id that was assocaited with the entry"
                                },
                                factor: {
                                    bsonType: "array",
                                    items: {
                                        bsonType: "objectId"
                                    },
                                    description: "factor id's that were associated with the entry"
                                }
                            }
                        }
                    },
                    aspect: {
                        bsonType: [ "array" ],
                        items: {
                            bsonType: "object",
                            required: [ "id", "count", "score"],
                            properties: {
                                id: {
                                    bsonType: "objectId",
                                    description: "id of the associated aspect"
                                },
                                count: {
                                    bsonType: "int",
                                    description: "number of entries that have contributed to aspect"
                                },
                                score: {
                                    bsonType: "double",
                                    description: "master score associated with the aspect"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
);

db.createCollection(
    "AspectLog",
    {
        autoIndexId: true,
        validator: { 
            $jsonSchema: {
                bsonType: "object",
                required: [ "userID", "aspect" ],
                properties: {
                    userID: {
                        bsonType: "objectId",
                        description: "ID of associated user"
                    },
                    aspect: {
                        bsonType: "array",
                        items: {
                            bsonType: "object",
                            required: [ "score", "dateAdded", "factorID" ],
                            properties: {
                                score: {
                                    bsonType: "double",
                                    description: "aspect score at the given date"
                                },
                                dateAdded: {
                                    bsonType: "date",
                                    description: "date the aspect was influenced"
                                },
                                factorID: {
                                    bsonType: "array",
                                    items: {
                                        bsonType: "objectId"
                                    },
                                    description: "factor ID's associated with the aspect update"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
);


//
// SAMPLE DATA
//
db.Mood.insertOne(
    {
        name: "mood name",
        level: NumberInt(0)
    }
)

db.Aspect.insertOne(
    {
        name: "aspect name",
        description: "aspect description"
    }
)

db.Factor.insertOne(
    {
        description: "factor description",
        affect: [ db.Aspect.find()[0]["_id"] ]
    }
)

db.User.insertOne(
    {
        firstName: "bob",
        lastName: "tran",
        password: "password",
        email: "bobtran@bobtran.com",
        entry: [
            {
                dateAdded: new Date(),
                moodID: db.Mood.find()[0]["_id"],
                factor: [ db.Factor.find()[0]["_id"] ]
            }
        ],
        aspect: [
            {
                id: db.Aspect.find()[0]["_id"],
                count: NumberInt(1),
                score: 0
            }
        ]
    }
)

db.AspectLog.insertOne(
    {
        userID: db.User.find()[0]["_id"],
        aspect: [
            {
                score: 0,
                dateAdded: new Date(),
                factorID: [ db.User.find()[0]["_id"] ]
            }
        ]
    }
)
