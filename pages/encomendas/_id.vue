<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h2>Detalhes da encomenda</h2>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Encomenda #{{ encomenda.id }}</h5>
            <p class="card-text">Total: {{ encomenda.total }} €</p>
            <p class="card-text">Estado: <span :class="estadoClass(encomenda.estado)">{{ encomenda.estado }}</span></p>
            <p class="card-text">Armazem de saída: {{ encomenda.armazem_saida }}</p>
            <p class="card-text">Data de Entrega: {{ encomenda.data_de_entrega }}</p>
            <p class="card-text">Local de Entrega: {{ encomenda.localEntrega }}</p>
            <h5>Produtos:</h5>
            <ul>
              <li v-for="produto in encomenda.produtos" :key="produto.id">
                {{ produto.nome }} - {{ produto.marca }} - {{ produto.preco }} € (Fornecedor: {{ produto.fornecedor }})
              </li>
            </ul>
            <h5>Observações:</h5>
            <ul>
              <li v-for="observacao in encomenda.observacoes" :key="observacao.timestamp">
                {{ observacao.type }}: {{ observacao.value }} {{ observacao.unit }} - {{ observacao.timestamp }}
              </li>
            </ul>
          </div>
        </div>
        <h2>Minhas encomendas</h2>
        <table class="table">
          <thead>
          <tr>
            <th scope="col" >Id</th>
            <th scope="col" >Total</th>
            <th scope="col" >Estado</th>
            <th scope="col" >Armazem de saida</th>
            <th scope="col" >Data de Entrega</th>
            <th scope="col" >Informaçao Adicional</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="encomenda in encomendas">
            <td class="pt-3">{{ encomenda.id }}</td>
            <td class="pt-3">{{ encomenda.total }} €</td>
            <td class="pt-3"><button class="btn" :class="estadoClass(encomenda.estado)">{{ encomenda.estado }}</button></td>
            <td class="pt-3">{{ encomenda.armazem_saida }}</td>
            <td class="pt-3">{{ encomenda.data_de_entrega }}</td>
            <td class="align-content-center"><button class="btn btn-secondary"><i class="bi bi-list-columns-reverse"></i></button></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
const config = useRuntimeConfig()
const api = config.public.API_URL
// Simulated data for an order (normally this would be fetched from an API or store)
const encomendas = [
  { id: 1, total: '67.45', estado: 'Entregue', armazem_saida: 'Amor', data_de_entrega: '10/12/2022', produtos: [{ id: 1, nome: 'Produto 1', marca: 'Marca A', preco: '10', fornecedor: 'Fornecedor X' },
      { id: 2, nome: 'Produto 2', marca: 'Marca B', preco: '20', fornecedor: 'Fornecedor Y' }],
    localEntrega: "Rua do Pinhal Grande, Lote 2, 3ºD", observacoes : [{ type: "Temperatura", value: "18", unit: "Cº", timestamp: "10/12/2022, 8:50"},
      { type: "Humidade", value: "0.03", unit: "Kg/m³", timestamp: "10/12/2022, 8:50"},
      { type: "Temperatura", value: "18", unit: "Cº", timestamp: "10/12/2022, 8:50"},
      { type: "Humidade", value: "0.04", unit: "Kg/m³", timestamp: "10/12/2022, 8:50"},
      { type: "Temperatura", value: "18", unit: "Cº", timestamp: "10/12/2022, 8:50"},
      { type: "Humidade", value: "0.03", unit: "Kg/m³", timestamp: "10/12/2022, 8:50"}]}
];

/*
const route = useRoute();
const encomendaId = parseInt(route.params.id, 10);
const encomenda = ref(encomendas.find(e => e.id === encomendaId));
*/
const encomenda = ref(encomendas[0]);

// Function to determine the class based on the order status
const estadoClass = (estado) => {
  switch (estado) {
    case 'Entregue':
      return 'badge bg-success';
    case 'Cancelado':
      return 'badge bg-danger';
    default:
      return 'badge bg-warning';
  }
};
</script>

<style scoped>
/* Styles corresponding to order statuses */
.badge.bg-success {
  background-color: green;
}

.badge.bg-danger {
  background-color: red;
}

.badge.bg-warning {
  background-color: yellow;
}

.estado-entregue {
  background-color: green;
  width: 20px;
  height: 20px;
}

.estado-cancelado {
  background-color: red;
}

.estado-other {
  background-color: yellow;
}
</style>


