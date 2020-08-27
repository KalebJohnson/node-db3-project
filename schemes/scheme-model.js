const db = require("../data/config")

function find(){
    return db("schemes")
    //SELECT * FROM schemes
}

function findById(id){
    return db("schemes")
    .where({id}).first()
    // SELECT * FROM schemes WHERE id = params.id FIRST/LIMIT 1
}

function findSteps(id){
    return db("steps")
    .join(
        "schemes",
        "schemes.id",
        "steps.scheme_id",
    )
    .select(
        "schemes.scheme_name",
        "steps.step_number",
        "steps.instructions",
    )
    .where({ scheme_id: id })
    .orderBy("steps.step_number")
}
/*
SELECT sc."scheme_name", st."step_number", st."instructions"
FROM "steps" AS st
JOIN "schemes" AS sc 
ON sc."id" = st."scheme_id" 
WHERE sc."id" = "params id = id"
ORDER BY st."step_number"

*/


function remove(id) {  
    return db('schemes')
        .where('schemes.id', id)
        .del()
        
}
// DELETE FROM schemes WHERE "schemes.id" = "params id = id"


function update(changes, id) {
    return db('schemes')
        .where({id})
        .update(changes)
}
//UPDATE "schemes" SET "changes to column values", WHERE "params id = id"

function add(schemeData) {
    return db('schemes').insert(schemeData);
};

// INSERT INTO schemes (scheme_name) VALUES ("req.body value");


module.exports = {
    find ,
    findById ,
    findSteps ,
    remove ,
    update ,
    add ,
}