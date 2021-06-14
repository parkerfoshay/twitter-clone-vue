let dataObject = {
  userData: {},
  userID: 0,
  name: "",
  email: "",
  password: "",
  max_length: 30,
  max_pass_length: 16,
  error: "",
  registered: false,
  tweetMsg: "",
  tweets: [],
  max_tweet: 200,
};

let methodsObject = {
  registerAccount() {
    if (this.name !== "" && this.email !== "" && this.password !== "") {
      this.userData.userID = this.userID;
      this.userData.name = this.name;
      this.userData.email = this.email;
      this.userData.password = this.password;
      this.registered = true;
    } else {
      this.error = "Incomplete form!";
    }

    /* Add registration data to the local storage */
    localStorage.setItem("simple_tweet_registered", true);
    /* Add the whole userData object as JSON string */
    localStorage.setItem(
      "simple_tweet_registered_user",
      JSON.stringify(this.userData)
    );

    this.name = "";
    this.email = "";
    this.password = "";
  },

  created() {
    if (localStorage.getItem("simple_tweet_registed") === "true") {
      this.registered = true;
    }

    if (localStorage.getItem("simple_tweet_registered_user")) {
      this.userData = JSON.parse(
        localStorage.getItem("simple_tweet_registered_user")
      );
    }

    if (localStorage.getItem("simple_tweet_tweets")) {
      console.log("There is a list of tweets");
      this.tweets = JSON.parse(localStorage.getItem("simple_tweet_tweets"));
    } else {
      console.log("No tweets here");
    }
  },

  sendTweet() {
    this.tweets.unshift({
      text: this.tweetMsg,
      date: new Date().toLocaleTimeString(),
    });

    this.tweetMsg = "";
    console.log(this.tweets);

    stringTweets = JSON.stringify(this.tweets);

    localStorage.setItem("simple_tweet_tweets", stringTweets);
  },
  removeTweet(index) {
    let removedTweets = confirm("Are you sure you want to remove this tweet?");

    if (removedTweets) {
      this.tweets.splice(index, 1);
      localStorage.simple_tweet_tweets = JSON.stringify(this.tweets);
    }
  },
};

Vue.component("tweet-message", {
  props: {
    text: String,
    date: String,
  },
  template: `
     <div>
         <p> {{text}} </p>
         <p> {{date}}</p>
     </div>
  `,
});

var app = new Vue({
  el: "#app",
  data: dataObject,
  methods: methodsObject,
});
