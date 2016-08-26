var CookieClicker = React.createClass({
  getInitialState: function() {
    if (Cookies.get('cookieclicker') === undefined) {
      return {
        cookies: 0.0,
        bonus: 0.0,
        clickfarm: 0,
        // Calm down, it stands for "cookies per second".
        cps: 1,
        bonuscost: 10
      }
    } else {
      return Cookies.getJSON('cookieclicker');
      console.log(Cookies.getJSON('cookieclicker'));
    }
  },

  onCookieClick: function() {
    this.setState({
      cookies: this.state.cookies + 1
    });
  },

  onBuyBonus: function() {
    if (this.state.bonuscost > this.state.cookies) {
      alert("You do not have enough cookies to purchase a bonus.");
    } else if (this.state.cookies > this.state.bonuscost) {
      this.setState({
        bonus: this.state.bonus + 1,
        bonuscost: this.state.bonuscost * 2,
        cps: this.state.cps + 2,
        cookies: this.state.cookies - this.state.bonuscost
      });
    } else {
      console.log("An error occured.");
    }
  },

  cookiesPerSecond: function() {
    this.setState({
      cookies: this.state.cookies + this.state.cps
    });
  },

  saveData: function() {
    Cookies.set('cookieclicker', {
      cookies: this.state.cookies,
      bonus: this.state.bonus,
      clickfarm: this.state.clickfarm,
      cps: this.state.cps,
      bonuscost: this.state.bonuscost
    });
  },

  componentDidMount: function() {
    this.interval = setInterval(this.cookiesPerSecond, 1000);
    this.save = setInterval(this.saveData, 1000);
  },

  render: function() {
    return (
    <div className = "row">
      <div className="col-md-6">
        <img src = "./public/images/cookie.png" onClick={this.onCookieClick} />
        <h2> Cookies : {this.state.cookies} <br/>
        Bonus:{this.state.bonus}<br/>
        Clickfarms:{this.state.clickfarm} <br/>
        Cookies Per Second:{this.state.cps}</h2>
      </div>
      <div className="col-md-6">
        <h2>Dashboard</h2>
        <button onClick={this.onBuyBonus} className="btn btn-large btn-success">Buy Bonus</button>
      </div>
    </div>
    )
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  }

});

ReactDOM.render(< CookieClicker / >, document.getElementById('app'));
