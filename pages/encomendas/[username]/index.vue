
<template>
  <div class="container">
    <div v-if="userType === 'Operador'||userType === 'Cliente'" class="row">
      <div class="col">
        <h2>Minhas encomendas</h2>
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Total</th>
            <th scope="col">Estado</th>
            <th scope="col">Armazem de saida</th>
            <th scope="col">Data de Entrega</th>
            <th scope="col">Informaçao Adicional</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="encomenda in encomendas" :key="encomenda.id">
            <td class="pt-3">{{ encomenda.id }}</td>
            <td class="pt-3">{{ encomenda.total }} €</td>
            <td class="pt-3">
              <button class="btn" :class="estadoClass(encomenda.estado)">
                {{ encomenda.estado }}
              </button>
            </td>
            <td class="pt-3">{{ encomenda.armazem_saida }}</td>
            <td class="pt-3">{{ encomenda.data_de_entrega }}</td>
            <td class="align-content-center">
              <!-- Navigate to the static _id.vue page -->
              <nuxt-link to="/encomendas/$(encomenda.id)" class="btn btn-secondary">
                <i class="bi bi-list-columns-reverse"></i>
              </nuxt-link>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="container">
    <div v-if="userType === 'Operador'" class="row">
      <div class="col">
        <h2>Entregas Realizadas pelo Operador: username</h2>
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Id da Entrega</th>
            <th scope="col">Total</th>
            <th scope="col">Estado</th>
            <th scope="col">Armazem de saida</th>
            <th scope="col">Data de Entrega</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="entrega in entregas" :key="entrega.id">
            <td class="pt-3">{{ entrega.id }}</td>
            <td class="pt-3">{{ entrega.total }} €</td>
            <td class="pt-3">{{ entrega.estado }}</td>
            <td class="pt-3">{{ entrega.armazem_saida }}</td>
            <td class="pt-3">{{ entrega.data_de_entrega }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!-- Seção para o operador manipular encomendas pendentes -->
  <div class="container mt-4">
    <div v-if="userType === 'Operador'" class="row">
      <div class="col">
        <h2>Encomendas Pendentes</h2>
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Total</th>
            <th scope="col">Armazem de saída</th>
            <th scope="col">Data de Entrega</th>
            <th scope="col">Ações</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="encomenda in encomendas.filter(e => e.estado !== 'Entregue' && e.estado !== 'Cancelado')" :key="encomenda.id">
            <td>{{ encomenda.id }}</td>
            <td>{{ encomenda.total }} €</td>
            <td>{{ encomenda.armazem_saida }}</td>
            <td>{{ encomenda.data_de_entrega }}</td>
            <td>
              <button v-if="encomenda.estado !== 'Em curso'" class="btn btn-primary" @click="marcarComoEmCurso(encomenda)">
                Marcar como Em curso
              </button>
              <button v-if="encomenda.estado === 'Em curso'" class="btn btn-success" @click="marcarComoEntregue(encomenda)">
                Marcar como Entregue
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '~/store/auth-store.js';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const userType = computed(() => user.value?.tipo);
const username = computed(() => user.value?.username);
const config = useRuntimeConfig();
const api = config.public.API_URL;
// Static data for demonstration purposes
const encomendas = ref([]);

// Função para buscar as encomendas do cliente
const fetchEncomendasCliente = async () => {
  try {
    const response = await authStore.fetchWithAuth(`${api}/encomendas/cliente/${authStore.username}`);
    encomendas.value = response.data; // Supondo que a resposta da API tenha um campo data
  } catch (error) {
    console.error('Erro ao buscar encomendas do cliente:', error);
  }
};


// Função para marcar uma encomenda como "Em curso"
const marcarComoEmCurso = (encomenda) => {
  encomenda.estado = 'Em curso';
  // Aqui você faria a lógica de atualização, como enviar uma requisição para a API
};

// Função para marcar uma encomenda como "Entregue"
const marcarComoEntregue = (encomenda) => {
  encomenda.estado = 'Entregue';
  // Similarmente, aqui você faria a lógica de atualização para a API
};


// Function to determine the class based on the order status
const estadoClass = (estado) => {
  switch (estado) {
    case 'Entregue':
      return 'btn-success';
    case 'Cancelado':
      return 'btn-danger';
    default:
      return 'btn-warning';
  }
};


onMounted(fetchEncomendasCliente);
</script>

<style scoped>
/* Styles corresponding to order statuses */
.estado-entregue {
  background-color: green;
}

.estado-cancelado {
  background-color: red;
}

.estado-other {
  background-color: yellow;
}
</style>
