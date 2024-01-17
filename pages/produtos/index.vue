<template>
  <div v-if="error">Error: {{ error.message }}</div>
  <div v-else>
    <nuxt-link to="/produtos/create">Criar um produto novo</nuxt-link>
    <br>
    <h2>Produtos</h2>
    <table>
      <tr><th>Nome</th><th>Marca</th><th>Fornecedor</th><th>Actions</th></tr>
      <tr v-for="produto in products">
        <td>{{ produto.nome }}</td>
        <td>{{ produto.marca }}</td>
        <td>{{ produto.fornecedor }}</td>
        <td><nuxt-link :to="`/produtos/${produto.id}`"><i class="bi bi-list-ul"></i></nuxt-link></td>
        <td><nuxt-link :to="`/produtos/${produto.id}/update`"><button><i class="bi bi-x-circle"></i></button></nuxt-link></td>
      </tr>
    </table>
  </div>
  <button @click.prevent="refresh"><i class="bi bi-arrow-clockwise"></i></button>
</template>
<script setup>
const config = useRuntimeConfig()
const api = config.public.API_URL
const {data: products, error, refresh} = await useFetch(`${api}/products`)
</script>