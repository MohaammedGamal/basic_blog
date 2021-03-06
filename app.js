//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

/**************/
mongoose.connect("mongodb+srv://admin:admin@cluster1.mdm7d.mongodb.net/Blog");

const Post_schema = new mongoose.Schema({
  Title: String,
  Post: String
})

const Post = mongoose.model("post", Post_schema);

/************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// let Posts = [];

app.get("/", (req, res) => {
  Post.find({}, function (err, Posts) {

    res.render("home", {
      Text1 : homeStartingContent,
      Text2 : aboutContent,
      Text3 : contactContent,
      Posts : Posts
    });

  })
})

app.get("/about", (req, res) => {
  res.render("about", {Text4 : aboutContent})
})

app.get("/contact", (req, res) => {
  res.render("contact", {Text5 : contactContent})
})

app.get("/compose", (req, res) => {
  res.render("compose");
})

app.post("/compose", (req, res) => {
  // console.log(req.body);

  let Post_title = req.body.Title;
  let Post_body = req.body.Post

  const post = new Post({

    Title: Post_title,
    Post: Post_body

  });

  post.save(function (err){

    if (!err) {

      res.redirect("/");

    }

  });

  // Post.find({}, function (err, post){
  //
  //   if (err) {
  //
  //     console.log(err);
  //
  //   } else {
  //
  //     res.render("home", {
  //
  //       Posts: post
  //
  //     })
  //
  //   }
  //
  // })

  // const Post = {Title: Post_title, Content: Post_body};
  //
  // Posts.push(Post);
  //
  // res.redirect("/");

})

// Post.find({}, function (err, post){
//
//   if (err) {
//
//     console.log(err);
//
//   } else {
//
//     res.render("home", {
//
//       Post: post
//
//     })
//
//   }
//
// })

app.get("/posts/:Post_id", (req, res) => {
  // console.log(req.params.Post_id);
  let param = req.params.Post_id;
  // console.log(param)

  // Posts.forEach((E) => {
  //   var Post_title = _.lowerCase(E.Title);
  //   var Post_post = E.Content;
  //   if (Post_title === param) {
  //     // console.log("Match found !");
  //     res.render("post", {Title: Post_title, Post: Post_post})
  //   }
  // });

  Post.findById({_id: param}, function (err, p){

    if (err) {

      console.log(err)

    } else {

      // console.log(p.Title)

      res.render("post", {

        Title: p.Title,
        Post: p.Post

      });

    }

  })

})












let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);
