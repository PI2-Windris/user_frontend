import React, { useState, useEffect } from 'react'
import {
  CCol,
  CRow,

} from '@coreui/react'

import axios from 'axios';

import {
  CWidgetDropdown
} from '@coreui/react'

import WidgetsBrand from '../widgets//WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

import ChartLineSimple from '../charts/ChartLineSimple'
import ChartBarSimple from '../charts/ChartBarSimple'

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
        // console.log(`http://localhost:8001/processing/produced/${generatorsArray[i]._id}?begin=2021-04-20T20:45:18&end=2022-04-20T20:45:18`)
        promisesEnergyProduced.push(
          axios
          .get(`http://localhost:8001/processing/produced/${generatorsArray[i]._id}?begin=2021-04-20T20:45:18&end=2022-04-20T20:45:18`, config)
          .then(response => {
            generatorsDataEnergyProduced.push(response)
          })
        );
      }

      let energySum = 0;

      Promise.all(promisesEnergyProduced).then(() =>  {
        for(let i = 0; i < generatorsDataEnergyProduced.length; i++) {
          energySum += generatorsDataEnergyProduced[i].data.averageEnergy * generatorsDataEnergyProduced[i].data.energyPerTime.length
          setTotalEnergyProduced(energySum)
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


      Promise.all(promisesClimate).then(() =>  {
        for(let i = 0; i < generatorsDataClimate.length; i++) {
          if(generatorsDataClimate[i].data.averageHumidity > 0) {
            sumAverageHumidity += generatorsDataClimate[i].data.averageHumidity
            qtdAverageHumidity += 1;
            setAverageHumidity(sumAverageHumidity/qtdAverageHumidity)
          } 

          if(generatorsDataClimate[i].data.averageTemperature > 0) {
            sumAverageTemperature += generatorsDataClimate[i].data.averageTemperature
            qtdAverageTemperature += 1;
            setAverageTemperature(sumAverageTemperature/qtdAverageTemperature)
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
          console.log(generatorsEnergyAverage[i])
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
    </>
  )
}

export default WindrisDashboard
