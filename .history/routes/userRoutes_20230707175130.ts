import { Router } from 'express';


const router = Router();


//User CRUD

//Create User
router.post('/user',(req, res) => {
    res.status(501).json({
        error:"Not Implemented"
    })
})

//Get a list of Users
router.get('/user',(req, res) => {
    res.status(501).json({
        error:"Not Implemented"
    })
   })


//get 1 user
router.get('/user/:id',(req, res) => {

    const {id}= req.params;

    res.status(501).json({
        error:`Not Implemented:${id}`
    })
   })

//Update User
router.put('/user/:id',(req, res) => {

    const {id}= req.params;

    res.status(501).json({
        error:`Not Implemented:${id}`
    })
   })

//Delete User

router.delete('/user/:id',(req, res) => {

    const {id}= req.params;

    res.status(501).json({
        error:`Not Implemented:${id}`
    })
   })






export default router;