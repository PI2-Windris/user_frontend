import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CTextarea,
  CInput,
  CLabel,
  CRow,
  CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import emailjs from 'emailjs-com';

const Maintenance = () => {

  return (
    <>
      <CRow>
        <CCol xs="12" md="6">
          <CCard>
            <CCardHeader>
              <h1>Manual de manutenção do gerador</h1>
            </CCardHeader>
            <CCardFooter>
              <p class="fixp">A Estação Windris é altamente confiável e não precisa de verificações de manutenção derotina. No entanto, é recomendável que uma inspeção dos equipamentos seja realizada afim de garantir que o sistema esteja funcionando em seu máximo potencial.A necessidade de manutenções antes dos prazos previstos, serão avisadas via notificações no aplicativo da Estação Windris ou através do e-mail cadastrado.</p>
              <h3>Painel Solar</h3>
              <p>A manutenção do painel solar pode ocorrer antes do previsto, considerando as condições locais.  Recomenda-se  inspeção  visual  para  avaliar  a  necessidade  de  limpeza  do equipamento.</p>
              <p>Para realizar a manutenção do painel, recomenda-se:</p>
              Desligar o seu sistema fotovoltaico antes da manutenção.
              <ul>
              <li>Não subir no poste, utilize equipamentos de segurança adequados.</li>
              <li>Limpar o painel em dias nublados, início da manhã ou à noite, evitando horários de sol forte.</li>
              </ul>
              <h5>Periodicidade</h5>
              <ul>
              <li>Recomenda-se limpeza anual para locais de pluviosidade regular e baixa presença de poeira e poluição.</li>
              <li>Para lugares com baixa pluviosidade e alta presença de poeira e poluição, sugere limpeza de 6 em 6 meses.</li>
              </ul>
              <h5>Cuidados</h5>
              <ul>
              <li>Não utilizar objetos metálicos ou produtos abrasivos para remover a sujeira.</li>
              <li>Evite riscar o vidro do painel solar, para manter o desempenho e segurança do equipamento.</li>
              <li>Não andar sobre o painel. Recomenda-se utilizar apenas água, se necessário usar sabão neutro.</li>
              <li>Utilizar escova macia ou rodo com lâmina de plástico com superfície de tecido macio.</li>
              <li>Evite jatos de água intensos, mantendo baixa pressão sobre a superfície do painel.</li>
              </ul>
              <h3>Aerogerador</h3>
              <p class="fixp">A manutenção do aerogerador pode ocorrer antes do previsto, considerando as condições locais. O eixo e as partes rotativas devem ser examinados por inspeção visual e inspeção de ruído, para encontrar quaisquer necessidades de manutenção.</p>
              <p>Para realizar a manutenção do aerogerador, recomenda-se:</p>
              <ul>
              <li>Desligar o seu sistema geração antes da manutenção.</li>
              </ul>
              <h5>Periodicidade</h5>
              <ul>
              <li>Todos os eixos principais e peças giratórias devem ser lubrificados a cada 3 anos.</li>
              </ul>
              <h3>Bateria</h3>
              <p>O sistema de armazenamento necessita de manutenções preventivas e corretivas.</p>
              <ul>
                <li>Desligar a Estação Windris antes da manutenção.</li>
              </ul>
              <h5>Periodicidade</h5>
              <ul>
                <li>Recomenda-se limpeza anual para locais de pluviosidade regular e baixa presença de poeira e poluição.</li>
                <li>Para lugares com alta pluviosidade e alta presença de poeira e poluição, sugere limpeza de 6 em 6 meses.</li>
              </ul>
              <h5>Cuidados</h5>
              <ul>
                <li>A  bateria  deve  ser  substituída  sempre  que  o  nível  do  eletrólito  estiver  baixo, indicado na figura a seguir, pois nesta condição a bateria pode vir a explodir.</li>
                <li>Recomenda-se  verificação  periódica  de  contato  da  bateria  com  água  e  outras substâncias no gabinete.</li>
              </ul>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Maintenance
