var CookieClicker = React.createClass({
  getInitialState: function() {
    if (Cookies.get('cookieclicker') === undefined || document.location.search.includes('reset')) {
      return {
        cookies: 0.0,
        bonus: 0.0,
        cursor: 0,
        // Calm down, it stands for "cookies per second".
        cps: 1,
        bonuscost: 10,
        cursorcost: 5
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

  onBuyCursor: function() {
    if (this.state.cursorcost > this.state.cookies) {
      alert("You do not have enough cookies to purchase a bonus.");
    } else if (this.state.cookies > this.state.cursorcost) {
      this.setState({
        cookies: this.state.cookies - this.state.cursorcost,
        cursor: this.state.cursor + 1,
        cursorcost: this.state.cursorcost * 2,
        cps: this.state.cps + 1
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
      cursor: this.state.cursor,
      cps: this.state.cps,
      bonuscost: this.state.bonuscost,
      cursorcost: this.state.cursorcost
    });
  },

  componentDidMount: function() {
    this.interval = setInterval(this.cookiesPerSecond, 1000);
    this.save = setInterval(this.saveData, 1000);
  },

  render: function() {
    return (
    <div className="row">
      <div className="col-md-6">
        <div className="cookie-side">
          <img className="cookie" src="./public/images/cookie.png" onClick={this.onCookieClick} />
          <h2 className="lobster">Cookies: <small className="white">{this.state.cookies}</small><br/>
          Bonus: <small className="white">{this.state.bonus}</small><br/>
        Cursors: <small className="white">{this.state.cursor}</small><br/>
      Cookies Per Second: <small className="white">{this.state.cps}</small></h2>
        </div>
      </div>
      <div className="col-md-6">
          <div className="dash-side">
                <h2 className="dashboard">Dashboard</h2>
                <button onClick={this.onBuyBonus} className="btn btn-large btn-success">Buy Bonus <span className="badge">Cost: {this.state.bonuscost}</span></button>
                <br />
                <br />
                <button onClick={this.onBuyCursor} className="btn btn-large btn-success">Buy Cursor <span className="badge">Cost: {this.state.cursorcost}</span></button>
        </div>
      </div>
    </div>
    )
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  }

});

ReactDOM.render(<CookieClicker />, document.getElementById('app'));
