import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CCol,
  CRow,
  CCard,
  CCardBody,
  CButton, 
  CButtonGroup,
  CCardHeader,
  CDataTable,
  CBadge,
  CPagination,
} from '@coreui/react'

import axios from 'axios';

import {
  CWidgetDropdown
} from '@coreui/react'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

import ChartLineSimple from '../charts/ChartLineSimple'
import ChartBarSimple from '../charts/ChartBarSimple'

import MainChartExample from '../charts/MainChartExample.js'

const WindrisDashboardUnique = ({match}) => {

  const [generator, setGenerator] = useState(match.params.id)

  const [totalEnergyProduced, setTotalEnergyProduced] = useState(0)

  // const [averageWind, setAverageWind] = useState(0)
  const [averageTemperature, setAverageTemperature] = useState(0)
  const [averageHumidity, setAverageHumidity] = useState(0)

  const [outputVoltage, setOutputVoltage] = useState(0)
  const [outputCurrent, setOutputCurrent] = useState(0)
  const [outputPower, setOutputPower] = useState(0)
  const [averageSupply, setAverageSupply] = useState(0)

  const [temperatureValues, setTemperatureValues] = useState([]);
  const [HumidityValues, setHumidityValues] = useState([]);
  const [energyProducedValues,setEnergyProducedValues] = useState([]);
  const [inversorValues,setInversorValues] = useState([]);
  const [efficiencyValues, setEfficiencyValues] = useState([]);
  const [co2Values, setCo2Values] = useState([]);

  useEffect(() => {

    

    const token = sessionStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${JSON.parse(token)}` }
    };

    console.log('generator: ', generator)

    axios
    .get(`http://localhost:8001/processing/produced/${generator}?begin=2021-04-20T20:45:18&end=2022-04-20T20:45:18`, config)
    .then(response => {
      console.log(response)
      setTotalEnergyProduced(response.data.averageEnergy)
      setEnergyProducedValues(response.data.energyPerTime.map((value) => {
        return value.energyProduced / 100000
      }))
    })

    // Pega dados climaticos dos geradores do usuario

  //   let promisesClimate = [];
  //   let generatorsDataClimate = [];


    axios
    .get(`http://localhost:8001/processing/climate/${generator}?begin=2021-04-20T20:45:18&end=2022-04-20T20:45:18`, config)
    .then(response => {
      // console.log(response)
      setAverageTemperature(response.data.averageTemperature)
      setAverageHumidity(response.data.averageHumidity)
      setTemperatureValues(response.data.temperaturePerTime.map((value) => {
        return value.energyProduced
      }))
      setHumidityValues(response.data.humidityPerTime.map((value) => {
        return value.energyProduced
      }))
    })

    // Pega dados de energia  dos geradores




    axios
    .get(`http://localhost:8001/processing/energy/${generator}?begin=2021-04-20T20:45:18&end=2022-04-20T20:45:18`, config)
    .then(response => {
      setAverageSupply(response.data.averageSupply)
      setOutputCurrent(response.data.averageCurrent)
      setOutputPower(response.data.averagePotency)
      setOutputVoltage(response.data.averageTension)
      // generatorsEnergyAverage.push(response)
    })

  //   // Pega dados da eficiencia do inversor dos geradores do usuario


  axios
  .get(`http://localhost:8001/processing/inversor/${generator}?begin=2021-04-20T20:45:18&end=2022-04-20T20:45:18`, config)
  .then(response => {
    setInversorValues(response.data.efficiencyPerTime.map((value) => {
      return value.inversorEfficiency
    }))
  })
  

  //   // Pega dados da eficiencia do sistema

 
  axios
  .get(`http://localhost:8001/processing/efficiency/${generator}?begin=2021-04-20T20:45:18&end=2022-04-20T20:45:18`, config)
  .then(response => {
    // console.log(response)
    setEfficiencyValues(response.data.efficiencyPerTime.map((value) => {
      return value.SystemEfficiency
    }))
  })

  //   // Pega dados do co2 do gerador

  axios
  .get(`http://localhost:8001/processing/co/${generator}?begin=2021-04-20T20:45:18&end=2022-04-20T20:45:18`, config)
  .then(response => {
    // console.log(response)
    setCo2Values(response.data.co2PerTime.map((value) => {
      return value.inversorEfficiency
    }))
  })


  
    

  }, [generator])


  return (
    <>
      <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-primary"
          header={generator.toString()}
          text="ID do gerador"
          footerSlot={
            <ChartLineSimple
              pointed
              className="c-chart-wrapper mt-3 mx-3"
              style={{height: '70px'}}
              dataPoints={[]}
              pointHoverBackgroundColor="primary"
            />
          }
        >
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-info"
          header={totalEnergyProduced.toString() + ' Wh'}
          text="Energia Gerada"
          footerSlot={
            <ChartLineSimple
              pointed
              className="mt-3 mx-3"
              style={{height: '70px'}}
              dataPoints={[]}
              pointHoverBackgroundColor="info"
              options={{ elements: { line: { tension: 0.00001 }}}}
            />
          }
        >
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-warning"
          header="10000000000.5 Wh"
          text="Meta de energia"primary
          footerSlot={
            <ChartLineSimple
              className="mt-3"
              style={{height: '70px'}}
              backgroundColor="rgba(255,255,255,.2)"
              options={{ elements: { line: { borderWidth: 2.5 }}}}
              pointHoverBackgroundColor="warning"
              dataPoints={[]}
            />
          }
        >
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-danger"
          header="9.823"
          text="Capacidade total"
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{height: '70px'}}
              backgroundColor="rgb(250, 152, 152)"
              dataPoints={[]}
            />
          }
        >

        </CWidgetDropdown>
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="6" lg='6'>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">Energia Produzida</h4>
              <div className="small text-muted">Abril 2021</div>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              <CButtonGroup className="float-right mr-3">
                {
                  ['Day', 'Month', 'Year'].map(value => (
                    <CButton
                      color="outline-secondary"
                      key={value}
                      className="mx-0"
                      active={value === 'Month'}
                    >
                      {value}
                    </CButton>
                  ))
                }
              </CButtonGroup>
            </CCol>
          </CRow>
          <MainChartExample data_range={100000} data={energyProducedValues} style={{"style":{height: '200px', marginTop: '40px'}}}/>
        </CCardBody>
      </CCard>
      </CCol>
      <CCol sm="6" lg='6'>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">Eficiência do Inversor(%)</h4>
              <div className="small text-muted">Abril 2021</div>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              <CButtonGroup className="float-right mr-3">
                {
                  ['Day', 'Month', 'Year'].map(value => (
                    <CButton
                      color="outline-secondary"
                      key={value}
                      className="mx-0"
                      active={value === 'Month'}
                    >
                      {value}
                    </CButton>
                  ))
                }
              </CButtonGroup>
            </CCol>
          </CRow>
          <MainChartExample data_range={10} data={inversorValues} style={{"style":{height: '200px', marginTop: '40px'}}}/>
        </CCardBody>
      </CCard>
      </CCol>
    </CRow>
    <CRow>
    
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-warning"
          header={averageTemperature}
          text="Temperatura Média"
          footerSlot={
            <ChartLineSimple
              className="mt-3"
              style={{height: '70px'}}
              backgroundColor="rgba(255,255,255,.2)"
              options={{ elements: { line: { borderWidth: 2.5 }}}}
              pointHoverBackgroundColor="warning"
              dataPoints={[]}
            />
          }
        >
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-danger"
          header={averageHumidity}
          text="Umidade Média"
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{height: '70px'}}
              backgroundColor="rgb(250, 152, 152)"
              dataPoints={[]}
            />
          }
        >

        </CWidgetDropdown>
      </CCol>
    
    </CRow>
    <CRow>
      <CCol sm="6" lg='6'>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">Temperatura média</h4>
              <div className="small text-muted">Abril 2021</div>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              <CButtonGroup className="float-right mr-3">
                {
                  ['Day', 'Month', 'Year'].map(value => (
                    <CButton
                      color="outline-secondary"
                      key={value}
                      className="mx-0"
                      active={value === 'Month'}
                    >
                      {value}
                    </CButton>
                  ))
                }
              </CButtonGroup>
            </CCol>
          </CRow>
          <MainChartExample data_range={100000} data={temperatureValues} style={{"style":{height: '200px', marginTop: '40px'}}}/>
        </CCardBody>
      </CCard>
      </CCol>
      <CCol sm="6" lg='6'>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">Umidade média</h4>
              <div className="small text-muted">Abril 2021</div>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              <CButtonGroup className="float-right mr-3">
                {
                  ['Day', 'Month', 'Year'].map(value => (
                    <CButton
                      color="outline-secondary"
                      key={value}
                      className="mx-0"
                      active={value === 'Month'}
                    >
                      {value}
                    </CButton>
                  ))
                }
              </CButtonGroup>
            </CCol>
          </CRow>
          <MainChartExample data_range={100000} data={HumidityValues} style={{"style":{height: '200px', marginTop: '40px'}}}/>
        </CCardBody>
      </CCard>
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-primary"
          header={outputVoltage}
          text="Tensão média de saída"
          footerSlot={
            <ChartLineSimple
              pointed
              className="c-chart-wrapper mt-3 mx-3"
              style={{height: '70px'}}
              dataPoints={[]}
              pointHoverBackgroundColor="primary"
            />
          }
        >
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-info"
          header={outputCurrent}
          text="Corrente média de saída"
          footerSlot={
            <ChartLineSimple
              pointed
              className="mt-3 mx-3"
              style={{height: '70px'}}
              dataPoints={[]}
              pointHoverBackgroundColor="info"
              options={{ elements: { line: { tension: 0.00001 }}}}
            />
          }
        >
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-warning"
          header={outputPower}
          text="Potência de saída"
          footerSlot={
            <ChartLineSimple
              className="mt-3"
              style={{height: '70px'}}
              backgroundColor="rgba(255,255,255,.2)"
              options={{ elements: { line: { borderWidth: 2.5 }}}}
              pointHoverBackgroundColor="warning"
              dataPoints={[]}
            />
          }
        >
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-danger"
          header={averageSupply}
          text="Fornecimento Médio"
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{height: '70px'}}
              backgroundColor="rgb(250, 152, 152)"
              dataPoints={[]}
            />
          }
        >

        </CWidgetDropdown>
      </CCol>
    </CRow>
    
    
    <CRow>
      <CCol sm="6" lg='6'>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">Eficiência  do Sistema</h4>
              <div className="small text-muted">Abril 2021</div>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              <CButtonGroup className="float-right mr-3">
                {
                  ['Day', 'Month', 'Year'].map(value => (
                    <CButton
                      color="outline-secondary"
                      key={value}
                      className="mx-0"
                      active={value === 'Month'}
                    >
                      {value}
                    </CButton>
                  ))
                }
              </CButtonGroup>
            </CCol>
          </CRow>
          <MainChartExample data_range={20} data={efficiencyValues} style={{"style":{height: '200px', marginTop: '40px'}}}/>
        </CCardBody>
      </CCard>
      </CCol>
      <CCol sm="6" lg='6'>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">Quantidade de Co2</h4>
              <div className="small text-muted">Abril 2021</div>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              <CButtonGroup className="float-right mr-3">
                {
                  ['Day', 'Month', 'Year'].map(value => (
                    <CButton
                      color="outline-secondary"
                      key={value}
                      className="mx-0"
                      active={value === 'Month'}
                    >
                      {value}
                    </CButton>
                  ))
                }
              </CButtonGroup>
            </CCol>
          </CRow>
          <MainChartExample data_range={100000} data={co2Values} style={{"style":{height: '200px', marginTop: '40px'}}}/>
        </CCardBody>
      </CCard>
      </CCol>
    </CRow>
    <CRow>
      
    </CRow>
    
    </>
  )
      
}

export default WindrisDashboardUnique
