<template>
  <div class="container">
    <div class="row">
      <div class="col">
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
const config = useRuntimeConfig()
const api = config.public.API_URL
//const {data: products, error, refresh} = await useFetch(`${api}/products`)
const encomendas = ref([
  { id: 1, total: '67.45', estado: 'Entregue', armazem_saida: 'Amor', data_de_entrega: '10/12/2022' },
  { id: 2, total: '98.65', estado: 'Em curso', armazem_saida: 'Gaia', data_de_entrega: '20/12/2022' },
  { id: 3, total: '85.62', estado: 'Cancelado', armazem_saida: 'Gaia', data_de_entrega: '20/12/2022'  }]);

const estadoClass = (estado) => {
  switch (estado) {
    case 'Entregue':
      return 'btn-success';
    case 'Cancelado':
      return 'btn-danger';
    default:
      return 'btn-warning';
  }
}
</script>
<style scoped>
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
