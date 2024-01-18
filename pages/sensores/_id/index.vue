<template>
  <div class="container">
    <h2>Simulação de Sensores</h2>
    <table class="table">
      <thead>
      <tr>
        <th>Nome do Sensor</th>
        <th>ID Sensor</th>
        <th>ID Encomenda</th>
        <th>Último Valor</th>
        <th>Ações</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="sensor in sensores" :key="sensor.idSensor">
        <td>{{ sensor.nome }}</td>
        <td>{{ sensor.idSensor }}</td>
        <td>{{ sensor.idEncomenda }}</td>
        <td>{{ sensor.ultimoValor }}</td>
        <td>
          <button class="btn btn-success me-3" @click="abrirModal(sensor)">Adicionar Observação</button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Modal para inserção de valores do sensor -->
    <div v-if="modalAberto" class="modal show" style="display: block">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Inserir Valor do Sensor {{ sensorAtual.nome }}</h5>
            <button type="button" class="close" @click="fecharModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="valorSensor">Valor:</label>
              <input type="number" id="valorSensor" class="form-control" v-model="valorSensor">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="fecharModal">Cancelar</button>
            <button type="button" class="btn btn-success me-3" @click="submeterValor">Submeter</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="modalAberto" class="modal-backdrop fade show"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const sensores = ref([
  { nome: 'Sensor de Temperatura', idSensor: 1, idEncomenda: 101, ultimoValor: null },
  { nome: 'Sensor de Humidade', idSensor: 2, idEncomenda: 102, ultimoValor: null },
  { nome: 'Sensor de Pressão', idSensor: 3, idEncomenda: 103, ultimoValor: null }
  // Adicione mais sensores conforme necessário
]);


const modalAberto = ref(false);
const sensorAtual = ref({});
const valorSensor = ref('');

const abrirModal = (sensor) => {
  sensorAtual.value = sensor;
  modalAberto.value = true;
};

const fecharModal = () => {
  modalAberto.value = false;
};


const submeterValor = () => {
  // Atualiza o valor do sensor atual com o valor inserido
  sensorAtual.value.ultimoValor = valorSensor.value;
  // Lógica para enviar o valor para a API
  console.log(`Valor do sensor ${sensorAtual.value.nome}: ${valorSensor.value}`);
  fecharModal();
};
</script>

<style scoped>
/* Adicione estilos conforme necessário para combinar com as outras tabelas */
.table {
  /* Estilos da tabela */
}
.modal {
  /* Estilos do modal */
}
</style>
