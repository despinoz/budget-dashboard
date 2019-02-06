import React, { Component } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import styled from 'styled-components';

const MainView = styled.div`
  display: flex;
  /* justify-content: space-around; */
  > div {
    flex-grow: 1;
  }
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      budget: [],
      facturado: [],
      facturacion: [],
      factLabels: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.obtenerPresupuesto = this.obtenerPresupuesto.bind(this);
    this.obtenerFacturado = this.obtenerFacturado.bind(this);
    this.obtenerFacturacionPorCr = this.obtenerFacturacionPorCr.bind(this);
  }

  componentDidMount() {
    this.obtenerPresupuesto('601');
    this.obtenerFacturado('601');
    this.obtenerFacturacionPorCr();
  }

  obtenerPresupuesto(cr) {
    axios
      .get(`/data/presupuesto/${cr}`)
      .then(({ data }) => {
        let budget = [];
        data.forEach(
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
      .then(({ data }) => {
        let facturado = [];
        data.forEach(el => facturado.push(+el.monto / 100));
        this.setState({ facturado });
      })
      .catch(error => {
        console.log(error);
      });
  }

  obtenerFacturacionPorCr() {
    axios
      .get(`/data/facturacion-por-cr`)
      .then(({ data }) => {
        let facturacion = [];
        let factLabels = [];
        const crs = [60128, 60132, 60133, 60137, 60138, 60142];
        data.forEach(el => {
          if (crs.includes(+el.cr)) {
            facturacion.push(+el.total / 100);
            factLabels.push(+el.cr);
          }
        });
        console.log(facturacion, factLabels);
        this.setState({ facturacion, factLabels });
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
        <MainView>
          <div>
            <select size="10" onChange={this.handleChange}>
              <option value="601">
                TOTAL SUBG. OPERACIÓN Y MANTENIMIENTO DISTRIB.
              </option>
              <option value="6012">DPTO MANTENIMIENTO INSTALACIONES MT</option>
              <option value="60128">60128 EJECUCIÓN MANIOBRAS</option>
              <option value="6013">DPTO MANTENIMIENTO INSTALACIONES BT</option>
              <option value="60132">
                60132 MANTENIMIENTO MEDICION DIRECTA
              </option>
              <option value="60133">
                60133 INSTAL. Y MANT. EQUIP. MEDIC. INDIRECT
              </option>
              <option value="60137">
                60137 OPERACIONES Y MANTENIMIENTO DISTRIB. SUR
              </option>
              <option value="60138">60138 EMERGENCIAS CAÑETE</option>
              <option value="6014">DPTO ATENCIÓN DE EMERGENCIAS BT</option>
              <option value="60142">
                60142 DIRECCION Y CONTROL SISTEMA BT{' '}
              </option>
            </select>
          </div>
          <div>
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
              // width={300}
              // height={500}
              options={{
                maintainAspectRatio: true,
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
          <div>
            <Pie
              data={{
                labels: this.state.factLabels,
                datasets: [
                  {
                    backgroundColor: [
                      '#FF6384',
                      '#36A2EB',
                      '#FFCE56',
                      '#FF6384',
                      '#36A2EB',
                      '#FFCE56'
                    ],
                    data: this.state.facturacion
                  }
                ]
              }}
            />
          </div>
        </MainView>
      </div>
    );
  }
}

export default App;
