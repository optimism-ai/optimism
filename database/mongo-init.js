
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
                required: [ "name", "weight" ],
                properties: {
                    name: {
                        bsonType: "string",
                        description: "name of mood"
                    },
                    weight: {
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
                required: [ "description", "aspectIDs" ],
                properties: {
                    description: {
                        bsonType: "string",
                        description: "description of factor"
                    },
                    aspectIDs: {
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
                required: [ "email" ],
                properties: {
                    firstName: {
                        bsonType: "string",
                        description: "first name of the user"
                    },
                    lastName: {
                        bsonType: "string",
                        description: "last name of the user"
                    },
                    email: {
                        bsonType: "string",
                        description: "email of the user"
                    },
                    entries: {
                        bsonType: [ "array" ],
                        items: {
                            bsonType: "object",
                            required: [ "dateAdded", "moodID", "factorIDs" ],
                            properties: {
                                dateAdded: {
                                    bsonType: "date",
                                    description: "date the entry was submitted"
                                },
                                moodID: {
                                    bsonType: "objectId",
                                    description: "mood id that was assocaited with the entry"
                                },
                                factorIDs: {
                                    bsonType: [ "array" ],
                                    items: {
                                        bsonType: "objectId"
                                    },
                                    description: "factor id's that were associated with the entry"
                                },
                                aspects: {
                                    bsonType: [ "array" ],
                                    items: {
                                        bsonType: "object",
                                        required: [ "aspectID", "score" ],
                                        properties: {
                                            aspectID: {
                                                bsonType: "objectId",
                                                description: "aspect id's that were impacted by the entry"
                                            },
                                            score: {
                                                bsonType: "double",
                                                description: "aspect score at the time of the entry"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    aspects: {
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


//
// SAMPLE DATA
//
db.Mood.insertOne(
    {
        name: "mood name",
        weight: NumberInt(0)
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
        aspectIDs: [ db.Aspect.find()[0]["_id"] ]
    }
)

db.User.insertOne(
    {
        firstName: "bob",
        lastName: "tran",
        email: "bobtran@bobtran.com",
        entry: [
            {
                dateAdded: new Date(),
                moodID: db.Mood.find()[0]["_id"],
                factorIDs: [ db.Factor.find()[0]["_id"] ],
                aspects: [
                    {
                        aspectID: db.Aspect.find()[0]["_id"],
                        score: 0
                    }
                ]
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

