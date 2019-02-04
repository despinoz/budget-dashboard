import React, { Component } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

class App extends Component {
  constructor() {
    super();
    this.state = {
      budget: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.obtenerPresupuesto = this.obtenerPresupuesto.bind(this);
  }

  componentDidMount() {
    this.obtenerPresupuesto('601');
    this.obtenerFacturado('601');
  }

  obtenerPresupuesto(cr) {
    axios
      .get(`/data/presupuesto/${cr}`)
      .then(response => {
        let budget = [];
        response.data.forEach(
          el => budget.push(+el.real)
          // budget.push(+el.real + (budget[idx - 1] || 0))
        );
        this.setState({ budget });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange(e) {
    this.obtenerPresupuesto(e.target.value);
  }

  render() {
    return (
      <div>
        <h1>Budget Dashboard</h1>
        <select size="10" onChange={this.handleChange}>
          <option value="601">SGOMD</option>
          <option value="6012">DMIMT</option>
          <option value="60128">60128</option>
          <option value="6013">DMIBT</option>
          <option value="60132">60132</option>
          <option value="60133">60133</option>
          <option value="60137">60137</option>
          <option value="60138">60138</option>
          <option value="6014">DAEBT</option>
          <option value="60142">60142</option>
        </select>
        <Bar
          data={{
            labels: [
              'Enero',
              'Febrero',
              'Marzo',
              'Abril',
              'Mayo',
              'Junio',
              'Julio',
              'Agosto',
              'Setiembre',
              'Octubre',
              'Noviembre',
              'Diciembre'
            ],
            datasets: [
              {
                data: this.state.budget
              }
            ]
          }}
          options={{
            // maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true // minimum value will be 0.
                  }
                }
              ]
            }
          }}
        />
      </div>
    );
  }
}

export default App;
