import React, { Component } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

class App extends Component {
  constructor() {
    super();
    this.state = {
      budget: [],
      facturado: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.obtenerPresupuesto = this.obtenerPresupuesto.bind(this);
    this.obtenerFacturado = this.obtenerFacturado.bind(this);
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

  obtenerFacturado(cr) {
    axios
      .get(`/data/facturado/${cr}`)
      .then(response => {
        let facturado = [];
        response.data.forEach(el => facturado.push(+el.monto / 100));
        this.setState({ facturado });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange(e) {
    this.obtenerPresupuesto(e.target.value);
    this.obtenerFacturado(e.target.value);
  }

  render() {
    return (
      <div>
        <h1>Budget Dashboard</h1>
        <select size="10" onChange={this.handleChange}>
          <option value="601">
            TOTAL SUBG. OPERACIÓN Y MANTENIMIENTO DISTRIB.
          </option>
          <option value="6012">DPTO MANTENIMIENTO INSTALACIONES MT</option>
          <option value="60128">60128 EJECUCIÓN MANIOBRAS</option>
          <option value="6013">DPTO MANTENIMIENTO INSTALACIONES BT</option>
          <option value="60132">60132 MANTENIMIENTO MEDICION DIRECTA</option>
          <option value="60133">
            60133 INSTAL. Y MANT. EQUIP. MEDIC. INDIRECT
          </option>
          <option value="60137">
            60137 OPERACIONES Y MANTENIMIENTO DISTRIB. SUR
          </option>
          <option value="60138">60138 EMERGENCIAS CAÑETE</option>
          <option value="6014">DPTO ATENCIÓN DE EMERGENCIAS BT</option>
          <option value="60142">60142 DIRECCION Y CONTROL SISTEMA BT </option>
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
                label: 'presupuesto',
                data: this.state.budget
              },
              {
                label: 'facturado',
                data: this.state.facturado,
                backgroundColor: 'rgb(255, 99, 132)'
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
