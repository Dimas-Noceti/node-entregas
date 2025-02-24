import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    let testUser = {
        name: 'Dimas',
        last_name: "Noceti",
        age: 18
      }
    res.render('index', {user: testUser, title: "Titulo random"});
})


router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
})








export default router;