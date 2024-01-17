<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="row">
          <h2 class="col align-self-start">Produtos</h2>
          <button class="btn btn-success col-2 align-self-end"@click="navigateToCreatePage" >Criar Produto <i class="bi bi-x-circle"></i></button>
        </div>
        <table class="table">
          <thead>
          <tr>
            <th scope="col" >Nome</th>
            <th scope="col" >Marca</th>
            <th scope="col" >Preço</th>
            <th scope="col" >Quantidade</th>
            <th scope="col" >Mais Opcoes</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="produto in products">
            <td class="pt-3">{{ produto.nome }}</td>
            <td class="pt-3">{{ produto.marca }}</td>
            <td class="pt-3">{{ produto.preco }}</td>
            <td class="pt-3">{{ produto.fornecedor }}</td>
            <td>
              <button class="btn btn-secondary me-2" ><i class="bi bi-list-ul"></i></button>
              <button class="btn btn-danger" ><i class="bi bi-x-circle"></i></button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const config = useRuntimeConfig()
const api = config.public.API_URL
//const {data: products, error, refresh} = await useFetch(`${api}/products`)
const products = ref([
  { id: 1, nome: 'Produto 1', marca: 'Marca A', preco: '10', fornecedor: 'Fornecedor X' },
  { id: 2, nome: 'Produto 2', marca: 'Marca B', preco: '20',fornecedor: 'Fornecedor Y' }]);
const router = useRouter();

const navigateToCreatePage = () => {
  router.push('/produtos/create');
};
</script>