<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="row">
          <h2 class="col align-self-start">Produtos</h2>
          <button class="btn btn-success col-2 align-self-end" @click="navigateToCreatePage">
            Criar Produto
            <i class="bi bi-plus-circle"></i>
          </button>
        </div>
        <table class="table">
          <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Marca</th>
            <th scope="col">Preço</th>
            <th scope="col">Fornecedor</th>
            <th scope="col">Estatísticas dos Sensores</th>
            <th scope="col">Consumo</th>
            <th scope="col">Mais Opções</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="produto in products" :key="produto.id">
            <td class="pt-3">{{ produto.nome }}</td>
            <td class="pt-3">{{ produto.marca }}</td>
            <td class="pt-3">{{ produto.preco }} €</td>
            <td class="pt-3">{{ produto.fornecedor }}</td>
            <td>
              <div v-for="sensor in produto.sensores" :key="sensor.tipo">
                {{ sensor.tipo }}:
                <span v-if="sensor.tipo === 'Temperatura'">{{ sensor.valor }}ºC</span>
                <span v-else>{{ sensor.valor }}{{ sensor.unidade }}</span>
              </div>
            </td>
            <td>{{ produto.consumo }}</td>
            <td>
              <button class="btn btn-secondary me-2" @click="verDetalhes(produto.id)"><i class="bi bi-list-ul"></i></button>
              <button class="btn btn-danger" @click="removerProduto(produto.id)"><i class="bi bi-x-circle"></i></button>
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

const products = ref([
  {
    id: 1,
    nome: 'Tinteiro 1',
    marca: 'Marca A',
    preco: '10',
    fornecedor: 'Fornecedor X',
    sensores: [
      { tipo: 'Temperatura', valor: '20', unidade: 'C' }
    ],
    consumo: '75%' // Nível atual de tinta
  },
  {
    id: 2,
    nome: 'Tinteiro 2',
    marca: 'Marca B',
    preco: '20',
    fornecedor: 'Fornecedor Y',
    sensores: [
      { tipo: 'Temperatura', valor: '22', unidade: 'C' }
    ],
    consumo: '40%' // Nível atual de tinta
  },
  // ... adicione mais produtos conforme necessário
]);

const router = useRouter();

const navigateToCreatePage = () => {
  router.push('/produtos/create');
};

const verDetalhes = (id) => {
  // Aqui você pode adicionar lógica para ver detalhes do produto
  console.log('Ver detalhes do produto com id:', id);
  router.push('/produtos/_id')
};

const removerProduto = (id) => {
  // Aqui você pode adicionar lógica para remover um produto
  console.log('Remover produto com id:', id);
};
</script>
