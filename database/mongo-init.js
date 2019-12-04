
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
                required: [ "name", "aspectIDs" ],
                properties: {
                    name: {
                        bsonType: "string",
                        description: "name of factor"
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
        name: "awful",
        weight: NumberInt(-2)
    }
)
db.Mood.insertOne(
    {
        name: "sad",
        weight: NumberInt(-1)
    }
)
db.Mood.insertOne(
    {
        name: "alright",
        weight: NumberInt(0)
    }
)
db.Mood.insertOne(
    {
        name: "good",
        weight: NumberInt(1)
    }
)
db.Mood.insertOne(
    {
        name: "awesome",
        weight: NumberInt(2)
    }
)

db.Aspect.insertOne(
    {
        name: "Work",
        description: "How your work life contributes to your general mood"
    }
)
db.Aspect.insertOne(
    {
        name: "Mental",
        description: "Mental stability contributes greatly to your general mood"
    }
)
db.Aspect.insertOne(
    {
        name: "Learning",
        description: "Introduction to new knowledge whether it is in school or self-taught skills can be beneficial to your mood"
    }
)
db.Aspect.insertOne(
    {
        name: "Health",
        description: "How your overall physical health can alter the way you feel"
    }
)
db.Aspect.insertOne(
    {
        name: "Media",
        description: "The amount of time spent on social media can help or hinder your mood"
    }
)
db.Aspect.insertOne(
    {
        name: "Social",
        description: "How your personal relationships with other can affect your feelings"
    }
)

db.Factor.insertOne(
    {
        name: "Late for work",
        aspectIDs: [ db.Aspect.find()[0]["_id"] ]
    }
)

db.Factor.insertOne(
    {
        name: "Staff meeting",
        aspectIDs: [ db.Aspect.find()[0]["_id"] ]
    }
)

db.Factor.insertOne(
    {
        name: "Sleep",
        aspectIDs: [ db.Aspect.find()[1]["_id"] ]
    }
)

db.Factor.insertOne(
    {
        name: "Relax",
        aspectIDs: [ db.Aspect.find()[1]["_id"] ]
    }
)

db.Factor.insertOne(
    {
        name: "Homework",
        aspectIDs: [ db.Aspect.find()[2]["_id"] ]
    }
)

db.Factor.insertOne(
    {
        name: "Class",
        aspectIDs: [ db.Aspect.find()[2]["_id"] ]
    }
)

db.Factor.insertOne(
    {
        name: "Work out",
        aspectIDs: [ db.Aspect.find()[3]["_id"] ]
    }
)

db.Factor.insertOne(
    {
        name: "Eat food",
        aspectIDs: [ db.Aspect.find()[3]["_id"] ]
    }
)

db.Factor.insertOne(
    {
        name: "Watch movies",
        aspectIDs: [ db.Aspect.find()[4]["_id"] ]
    }
)

db.Factor.insertOne(
    {
        name: "Listen to music",
        aspectIDs: [ db.Aspect.find()[4]["_id"] ]
    }
)

db.Factor.insertOne(
    {
        name: "Time with family/friends ",
        aspectIDs: [ db.Aspect.find()[5]["_id"] ]
    }
)

db.Factor.insertOne(
    {
        name: "Party",
        aspectIDs: [ db.Aspect.find()[5]["_id"] ]
    }
)

db.User.insertOne(
    {
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

