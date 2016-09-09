var HarambeClicker = React.createClass({
  getInitialState: function() {
    if (Cookies.get('harambeclicker') === undefined || document.location.search.includes('reset')) {
      return {
        harambes: 0.0,
        bonus: 0.0,
        banana: 0,
        // Calm down, it stands for "harambes per second".
        hps: 1,
        bonuscost: 10,
        bananacost: 1,
        bananafarmcost: 20,
        bananafarms: 0,
        superbonus: 0,
        superbonuscost: 50000
      }
    } else {
      return Cookies.getJSON('harambeclicker');
      console.log(Cookies.getJSON('harambeclicker'));
    }
  },

  onHarambeClick: function() {
    this.setState({
      harambes: this.state.harambes + 1
    });
  },

  onBuyBonus: function() {
    if (this.state.bonuscost > this.state.harambes) {
      notie.alert(3, 'You don\'t have enough harambes to purchase.', 1)
    } else if (this.state.harambes > this.state.bonuscost) {
      this.setState({
        bonus: this.state.bonus + 1,
        bonuscost: this.state.bonuscost * 2,
        hps: this.state.hps + 2,
        harambes: this.state.harambes - this.state.bonuscost
      });
      notie.alert(1, 'Purchased', 1)
    } else {
      console.log("An error occured.");
    }
  },

  onBuyBanana: function() {
    if (this.state.bananacost > this.state.harambes) {
      notie.alert(3, 'You don\'t have enough harambes to purchase.', 1)
    } else if (this.state.harambes > this.state.bananacost) {
      this.setState({
        harambes: this.state.harambes - this.state.bananacost,
        banana: this.state.banana + 1,
        bananacost: this.state.bananacost * 2,
        hps: this.state.hps + 1
      });
      notie.alert(1, 'Purchased', 1)
    } else {
      console.log("An error occured.");
    }
  },

  onBuyBananaFarm: function() {
    if (this.state.bananafarmcost > this.state.harambes) {
      notie.alert(3, 'You don\'t have enough harambes to purchase.', 1)
    } else if (this.state.harambes > this.state.bananafarmcost) {
      this.setState({
        harambes: this.state.harambes - this.state.bananafarmcost,
        bananafarms: this.state.bananafarms + 1,
        bananacost: this.state.bananafarmcost * 3,
        hps: this.state.hps + 5
      });
      notie.alert(1, 'Purchased', 1)
    } else {
      console.log("An error occured.");
    }
  },

  onSuperBonus: function() {
    if (this.state.superbonuscost > this.state.harambes) {
      notie.alert(3, 'You don\'t have enough harambes to purchase.', 1)
    } else if (this.state.superbonuscost > this.state.bananafarmcost) {
      this.setState({
        harambes: this.state.harambes - this.state.superbonuscost,
        superbonus: this.state.superbonus + 1,
        superbonuscost: this.state.superbonuscost * 4,
        hps: this.state.hps + 5000
      });
      notie.alert(1, 'Purchased', 1)
    } else {
      console.log("An error occured.");
    }
  },

  harambesPerSecond: function() {
    this.setState({
      harambes: this.state.harambes + this.state.hps
    });
    document.title = this.state.harambes + " Harambes" + " - Harambe Clicker";
  },

  saveData: function() {
    Cookies.set('harambeclicker', {
      harambes: this.state.harambes,
      bonus: this.state.bonus,
      banana: this.state.banana,
      hps: this.state.hps,
      bonuscost: this.state.bonuscost,
      bananacost: this.state.bananacost,
      bananafarms: this.state.bananafarms,
      bananafarmcost: this.state.bananafarmcost,
      superbonus: this.state.superbonus,
      superbonuscost: this.state.superbonuscost
    });
  },

  componentDidMount: function() {
    this.interval = setInterval(this.harambesPerSecond, 1000);
    this.save = setInterval(this.saveData, 1000);
    cheet('i l o v e h a r a m b e', function () {
      alert('We all love him. <3. Take these harambes as thanks.');
      notie.alert(1, '+100000', 1)
      Cookies.set('harambeclicker', {
        harambes: this.state.harambes + 100000
      });
      location.reload();
    });
  },

  render: function() {
    return (
    <div className="row">
      <div className="col-md-6">
        <div className="cookie-side">
          <img className="cookie loud-link-hover" data-sound="harambe" width="295" src="./public/images/harambe.png" onClick={this.onHarambeClick} />
        </div>
      </div>
      <div className="col-md-6">
          <div className="dash-side">
                <h2 className="dashboard">Dashboard</h2>
                <div className="col-md-6">
                  <br />
                  <button onClick={this.onBuyBonus} className="btn btn-large btn-success">Buy Bonus <span className="badge">Cost: {this.state.bonuscost}</span></button>
                  <br />
                  <br />
                  <button onClick={this.onBuyBanana} className="btn btn-large btn-success">Buy Banana <span className="badge">Cost: {this.state.bananacost}</span></button>
                  <br />
                  <br />
                  <button onClick={this.onBuyBananaFarm} className="btn btn-large btn-success">Buy Banana Farm <span className="badge">Cost: {this.state.bananafarmcost}</span></button>
                  <br />
                  <br />
                  <button onClick={this.onSuperBonus} className="btn btn-large btn-success"><b>Buy <span className="heart">Heart of Harambe</span></b> <span className="badge">Cost: {this.state.superbonuscost} + Love</span></button>
                </div>
                <div className="col-md-6">
                  <br />
                  <div className="list-group">
                    <button type="button" className="list-group-item"><span className="badge">{this.state.harambes}</span>Harambes</button>
                    <button type="button" className="list-group-item"><span className="badge">{this.state.bonus}</span>Bonus</button>
                    <button type="button" className="list-group-item"><span className="badge">{this.state.banana}</span>Bananas</button>
                    <button type="button" className="list-group-item"><span className="badge">{this.state.bananafarms}</span>Bananas Farms</button>
                      <button type="button" className="list-group-item"><span className="badge">{this.state.superbonus}</span>Heart of the Mother</button>
                    <button type="button" className="list-group-item"><span className="badge">{this.state.hps}</span>Harambes Per Second</button>
                  </div>
                </div>
        </div>
      </div>
    </div>
    )
  },

  componentWillUnmount: function() {
    clearInterval(this.interval);
  }

});

ReactDOM.render(<HarambeClicker />, document.getElementById('app'));
