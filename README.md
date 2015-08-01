
# Reacktor 

Easy to use React Frontend for [FlowRouter](https://github.com/kadirahq/flow-router)

With Reacktor you can write routes like this:

~~~jsx
  Reaktor.init(
    <Router>
      <Route path="/" layout={Layout} content={BlogList} />
      <Route path="/blog/:page" layout={Layout} content={BlogPost} />
      <Route path="/about" layout={About} />
        <Route path="/about/company" layout={Layout} content={Company}  />
    </Router>
  );
~~~

Behind the schenes, it uses [FlowRouter](https://github.com/kadirahq/flow-router) and [ReactLayout](https://github.com/kadirahq/meteor-react-layout).

## Installation

First add [FlowRouter 2.0](https://github.com/kadirahq/meteor-react-layout) or [FlowRouter SSR](https://github.com/kadirahq/flow-router/tree/ssr) into your app:

~~~
meteor add kadira:flow-router
// or
meteor add kadira:flow-router-ssr
~~~

Then add Reaktor

~~~
meteor add kadira:reaktor
~~~

### Usage

Let's say we've two React components like this:

~~~jsx
BlogList = React.createClass({
  render() {
    return (
      <div>
        This is the blog list:
        <ul>
          <li><a href="/blog/hello-post">Hello Post</a></li>
        </ul>
      </div>
    );
  }
});

BlogPost = React.createClass({
  render() {
    return (
      <div>
        <p><a href="/">Back</a></p>
        This is the blog post
      </div>
    );
  }
});
~~~

Then, here's the layout:

~~~jsx
Layout = React.createClass({
  render() {
    return (
      <div>
        <h1>My Blog </h1>
        {this.props.content}
      </div>
    );
  }
});
~~~

Now let's create routes:

~~~jsx
Reaktor.init(
    <Router>
        <Route path="/" layout={Layout} content={BlogList} />
        <Route path="/blog/:postId" layout={Layout} content={BlogPost} />
    </Router>
);
~~~


## Accessing Route Context

Then, you can access the FlowRouter's current context inside `BlogList` and `BlogPost` component using their props. See:

~~~jsx
BlogPost = React.createClass({
  componentWillMount() {
    var postId = this.props.params.postId;
    console.log("This the postId:", postId);
  },
  render() {
    ...
  }
});
~~~

## Passing Route Options

You can also pass FlowRouter route options like `name` and `triggersEnter` like this:

~~~jsx
  Reaktor.init(
    <Router>
      <Route 
        path="/" 
        name="homePage"
        layout={Layout} 
        content={BlogList} 
        triggersEnter={homePageLogger}/>
    </Router>
  );

  function homePageLogger(context, redirect) {
    if(context.queryParams.forwardToBlog) {
      redirect("/blog");
    }
  }
~~~

