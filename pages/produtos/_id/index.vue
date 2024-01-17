<template>
  <h1 class="ms-5 d-flex justify-content-center">Produto #1</h1>
  <br>
  <div class="input-group ms-2 d-flex justify-content-center" >
    <form @submit.prevent="create">
      <div class="row">
        <div class="mb-3 col">
          <label for="inputNome" class="form-label">Nome</label>
          <input type="text" v-model="produto.nome" class="form-control" id="inputNome" readonly>
        </div>
        <div class="mb-3 col">
          <label for="inputMarca" class="form-label">Marca</label>
          <input type="text" v-model="produto.marca" class="form-control" id="inputMarca" readonly>
        </div>
      </div>
      <div class="mb-3 col">
        <label for="inputFornecedor" class="form-label">Fornecedor</label>
        <input type="text" v-model="produto.fornecedor" class="form-control" id="inputFornecedor" readonly>
      </div>
      <div class="mb-3">
        <label for="inputConteudo" class="form-label">Conteudo</label>
        <textarea rows="3" type="text" v-model="produto.conteudo" class="form-control" id="inputConteudo" readonly></textarea>
      </div>
      <div class="row">
        <div class="mb-3 col">
          <label for="inputQuantidade" class="form-label">Quantidade</label>
          <input type="number" v-model="produto.quantidade" class="form-control" id="inputQuantidade" readonly>
        </div>
        <div class="mb-3 col">
          <label for="inputUnidadeDeMedida" class="form-label">Unidade de medida</label>
          <input type="text" v-model="produto.medida" class="form-control" id="inputUnidadeDeMedida" readonly>
        </div>
      </div>
      <div class="d-flex justify-content-around">
        <button class="btn btn-secondary me-2 col-4" type="reset">Back</button>
        <button class="btn btn-primary col-4" type="submit">Update</button>
      </div>
    </form>
  </div>
  {{ message }}
</template>
<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue';
const router = useRouter()

const produto = ref({ id: 1, nome: 'Produto 1', marca: 'Marca A', preco: '10', fornecedor: 'Fornecedor X', quantidade: "330", medida:"ml" })

const message = ref('')
const config = useRuntimeConfig()
const api = config.public.API_URL

async function create() {

}

</script>