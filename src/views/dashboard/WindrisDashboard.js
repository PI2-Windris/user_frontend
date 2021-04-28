import React, { useState, useEffect } from 'react'
import {
  CCol,
  CRow,
  CCard,
  CCardBody,
  CButton, 
  CButtonGroup
} from '@coreui/react'

import axios from 'axios';

import {
  CWidgetDropdown
} from '@coreui/react'

import WidgetsBrand from '../widgets//WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

import ChartLineSimple from '../charts/ChartLineSimple'
import ChartBarSimple from '../charts/ChartBarSimple'

import MainChartExample from '../charts/MainChartExample.js'

import CIcon from '@coreui/icons-react'
const WindrisDashboard = () => {

  const [generatoresNumber, setGeneratorNumber] = useState(0)
  const [generatorsArray, setGeneratorsArray] = useState([])

  const [totalEnergyProduced, setTotalEnergyProduced] = useState(0)

  const [averageWind, setAverageWind] = useState(0)
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
    const userId = sessionStorage.getItem('userId');
    const token = sessionStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${JSON.parse(token)}` }
    };

    axios
      .get(`http://localhost:8001/generator/user/${JSON.parse(userId)}`, config)
      .then(response => {
        // console.log(response.data, response.data.length)
        setGeneratorNumber(response.data.length)
      })

      axios
      .get(`http://localhost:8001/generator/user/${JSON.parse(userId)}`, config)
      .then(response => {
        setGeneratorsArray(response.data)
      })
  
    }, [])

  useEffect(() => {

    

    const token = sessionStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${JSON.parse(token)}` }
    };


    // Pega dados da energia produzida pelos geradores do usuario

    let promisesEnergyProduced = [];
    let generatorsDataEnergyProduced = [];

    for(let i = 0; i < generatorsArray.length;  i++) {
      promisesEnergyProduced.push(
        axios
        .get(`http://localhost:8001/processing/produced/${generatorsArray[i]._id}?begin=2021-04-20T20:45:18&end=2022-04-20T20:45:18`, config)
        .then(response => {
          generatorsDataEnergyProduced.push(response)
        })
      );
    }

    let energySum = 0;
    let qtdEnergySum = 0;
    let energyArray = new Array(20).fill(0)

    Promise.all(promisesEnergyProduced).then(() =>  {
      for(let i = 0; i < generatorsDataEnergyProduced.length; i++) {
        energySum += generatorsDataEnergyProduced[i].data.averageEnergy * generatorsDataEnergyProduced[i].data.energyPerTime.length
        setTotalEnergyProduced(energySum)

        if(generatorsDataEnergyProduced[i].data.averageEnergy > 0) {

          qtdEnergySum += 1

          for(let j = 0; j < generatorsDataEnergyProduced[i].data.energyPerTime.length; j++) {
            energyArray[j] += parseInt(generatorsDataEnergyProduced[i].data.energyPerTime[j].energyProduced)
          }
          setEnergyProducedValues(energyArray.map(number => number / (qtdEnergySum * 100000)))
        } 
      }
    });

    // Pega dados climaticos dos geradores do usuario

    let promisesClimate = [];
    let generatorsDataClimate = [];

    for(let i = 0; i < generatorsArray.length;  i++) {
      promisesClimate.push(
        axios
        .get(`http://localhost:8001/processing/climate/${generatorsArray[i]._id}?begin=2021-04-20T20:45:18&end=2022-04-20T20:45:18`, config)
        .then(response => {
          // console.log(response)
          generatorsDataClimate.push(response)
        })
      );
    }

    let sumAverageWind = 0;
    let qtdAverageWind = 0;

    let sumAverageHumidity = 0;
    let qtdAverageHumidity = 0;

    let sumAverageTemperature = 0;
    let qtdAverageTemperature = 0;
    

    let temperatureArray = new Array(20).fill(0)
    let humidityArray = new Array(20).fill(0)


    Promise.all(promisesClimate).then(() =>  {
      for(let i = 0; i < generatorsDataClimate.length; i++) {
        if(generatorsDataClimate[i].data.averageHumidity > 0) {
          sumAverageHumidity += generatorsDataClimate[i].data.averageHumidity
          qtdAverageHumidity += 1;
          setAverageHumidity(sumAverageHumidity/qtdAverageHumidity)

          for(let j = 0; j < generatorsDataClimate[i].data.humidityPerTime.length; j++) {
            humidityArray[j] += parseInt(generatorsDataClimate[i].data.humidityPerTime[j].energyProduced)
        }
        setHumidityValues(humidityArray.map(number => number / qtdAverageHumidity))
        } 

        if(generatorsDataClimate[i].data.averageTemperature > 0) {
          sumAverageTemperature += generatorsDataClimate[i].data.averageTemperature
          qtdAverageTemperature += 1;
          setAverageTemperature(sumAverageTemperature/qtdAverageTemperature)

          for(let j = 0; j < generatorsDataClimate[i].data.temperaturePerTime.length; j++) {
              temperatureArray[j] += parseInt(generatorsDataClimate[i].data.temperaturePerTime[j].energyProduced)
          }
          setTemperatureValues(temperatureArray.map(number => number / qtdAverageTemperature))
        } 

        if(generatorsDataClimate[i].data.averageWind > 0) {
          sumAverageWind += generatorsDataClimate[i].data.averageWind
          qtdAverageWind += 1;
          setAverageWind(sumAverageWind/qtdAverageWind)
        } 
      }
    });

    // Pega dados de energia média dos geradores

    let promisesEnergyAverage = [];
    let generatorsEnergyAverage = [];

    for(let i = 0; i < generatorsArray.length;  i++) {
      promisesEnergyAverage.push(
        axios
        .get(`http://localhost:8001/processing/energy/${generatorsArray[i]._id}?begin=2021-04-20T20:45:18&end=2022-04-20T20:45:18`, config)
        .then(response => {
          generatorsEnergyAverage.push(response)
        })
      );
    }

    let sumOutputVoltage = 0;
    let qtdOutputVoltage = 0;

    let sumOutputCurrent = 0;
    let qtdOutputCurrent = 0;

    let sumOutputPower = 0;
    let qtdOutputPower = 0;

    let sumAverageSupply = 0;
    let qtdAverageSupply = 0;

    Promise.all(promisesEnergyAverage).then(() =>  {
      for(let i = 0; i < generatorsEnergyAverage.length; i++) {
        if(generatorsEnergyAverage[i].data.averageTension > 0) {
          sumOutputVoltage += generatorsEnergyAverage[i].data.averageTension
          qtdOutputVoltage += 1;
          setOutputVoltage(sumOutputVoltage/qtdOutputVoltage)
        } 

        if(generatorsEnergyAverage[i].data.averageCurrent > 0) {
          sumOutputCurrent += generatorsEnergyAverage[i].data.averageCurrent
          qtdOutputCurrent += 1;
          setOutputCurrent(sumOutputCurrent/qtdOutputCurrent)
        } 

        if(generatorsEnergyAverage[i].data.averagePotency > 0) {
          sumOutputPower += generatorsEnergyAverage[i].data.averagePotency
          qtdOutputPower += 1;
          setOutputPower(sumOutputPower/qtdOutputPower)
        } 

        if(generatorsEnergyAverage[i].data.averageSupply > 0) {
          sumAverageSupply += generatorsEnergyAverage[i].data.averageSupply
          qtdAverageSupply += 1;
          setAverageSupply(sumAverageSupply/qtdAverageSupply)
        }
      }
    });

    // Pega dados da eficiencia do inversor dos geradores do usuario

    let promisesInversor = [];
    let generatorsDataInversor = [];

    for(let i = 0; i < generatorsArray.length;  i++) {
      promisesInversor.push(
        axios
        .get(`http://localhost:8001/processing/inversor/${generatorsArray[i]._id}?begin=2021-04-20T20:45:18&end=2022-04-20T20:45:18`, config)
        .then(response => {
          // console.log(response)
          generatorsDataInversor.push(response)
        })
      );
    }

    let qtdInversor = 0;
    let inversorArray = new Array(20).fill(0)

    Promise.all(promisesInversor).then(() =>  {
      for(let i = 0; i < generatorsDataInversor.length; i++) {
        if(generatorsDataInversor[i].data.average > 0) {
          qtdInversor += 1

          for(let j = 0; j < generatorsDataInversor[i].data.efficiencyPerTime.length; j++) {
            inversorArray[j] += parseInt(generatorsDataInversor[i].data.efficiencyPerTime[j].inversorEfficiency)
          }
          setInversorValues(inversorArray.map(number => number / qtdInversor))
        } 
      }
    });

    // Pega dados da eficiencia do sistema

    let promisesEfficiency = [];
    let generatorsDataEfficiency = [];

    for(let i = 0; i < generatorsArray.length;  i++) {
      promisesEfficiency.push(
        axios
        .get(`http://localhost:8001/processing/efficiency/${generatorsArray[i]._id}?begin=2021-04-20T20:45:18&end=2022-04-20T20:45:18`, config)
        .then(response => {
          // console.log(response)
          generatorsDataEfficiency.push(response)
        })
      );
    }

    let qtdEfficiency = 0;
    let efficiencyArray = new Array(20).fill(0)

    Promise.all(promisesEfficiency).then(() =>  {
      for(let i = 0; i < generatorsDataEfficiency.length; i++) {
        if(generatorsDataEfficiency[i].data.average > 0) {
          qtdEfficiency += 1

          for(let j = 0; j < generatorsDataEfficiency[i].data.efficiencyPerTime.length; j++) {
            efficiencyArray[j] += parseInt(generatorsDataEfficiency[i].data.efficiencyPerTime[j].SystemEfficiency)
          }
          setEfficiencyValues(efficiencyArray.map(number => number / qtdEfficiency))
        } 
      }
    });

    // Pega dados do co2 do gerador

    let promisesCo2 = [];
    let generatorsDataCo2 = [];

    for(let i = 0; i < generatorsArray.length;  i++) {
      promisesCo2.push(
        axios
        .get(`http://localhost:8001/processing/co/${generatorsArray[i]._id}?begin=2021-04-20T20:45:18&end=2022-04-20T20:45:18`, config)
        .then(response => {
          console.log(response)
          generatorsDataCo2.push(response)
        })
      );
    }

    let qtdCo2 = 0;
    let co2Array = new Array(20).fill(0)

    Promise.all(promisesCo2).then(() =>  {
      for(let i = 0; i < generatorsDataCo2.length; i++) {
        if(generatorsDataCo2[i].data.average > 0) {
          qtdCo2 += 1

          for(let j = 0; j < generatorsDataCo2[i].data.co2PerTime.length; j++) {
            co2Array[j] += parseInt(generatorsDataCo2[i].data.co2PerTime[j].inversorEfficiency)
          }
          setCo2Values(co2Array.map(number => number / qtdCo2))
        } 
      }
    });
    

  }, [generatorsArray])


  return (
    <>
      <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-primary"
          header={generatoresNumber.toString()}
          text="Geradores"
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
      <CCol sm="6" lg="4">
        <CWidgetDropdown
          color="gradient-info"
          header={averageWind}
          text="Velocidade média do vento"
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

      <CCol sm="6" lg="4">
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

      <CCol sm="6" lg="4">
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
          <MainChartExample data_range={3} data={inversorValues} style={{"style":{height: '200px', marginTop: '40px'}}}/>
        </CCardBody>
      </CCard>
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
          <MainChartExample data_range={3} data={efficiencyValues} style={{"style":{height: '200px', marginTop: '40px'}}}/>
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
    
    </>
  )
}

export default WindrisDashboard
