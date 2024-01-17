<template>
  <h1 class="ms-5 d-flex justify-content-center">Criar Produto</h1>
  <br>
  <div class="input-group ms-2 d-flex justify-content-center" >
    <form @submit.prevent="create">
      <div class="row">
        <div class="mb-3 col">
          <label for="inputNome" class="form-label">Nome</label>
          <input type="text" v-model="prodForm.nome" class="form-control" id="inputNome">
        </div>
        <div class="mb-3 col">
          <label for="inputMarca" class="form-label">Marca</label>
          <input type="text" v-model="prodForm.marca" class="form-control" id="inputMarca">
        </div>
      </div>
      <div class="mb-3">
        <label for="inputConteudo" class="form-label">Conteudo</label>
        <textarea rows="3" type="text" v-model="prodForm.conteudo" class="form-control" id="inputConteudo"></textarea>
      </div>
      <div class="row">
        <div class="mb-3 col">
          <label for="inputQuantidade" class="form-label">Quantidade</label>
          <input type="number" v-model="prodForm.quantidade" class="form-control" id="inputQuantidade">
        </div>
        <div class="mb-3 col">
          <label for="inputUnidadeDeMedida" class="form-label">Unidade de medida</label>
          <input type="text" v-model="prodForm.medida" class="form-control" id="inputUnidadeDeMedida">
        </div>
      </div>
      <div class="d-flex justify-content-around">
        <button class="btn btn-secondary me-2 col-4" type="reset">RESET</button>
        <button class="btn btn-success col-4" type="submit">CREATE</button>
      </div>
    </form>
  </div>
  {{ message }}
</template>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const prodForm = reactive({
  nome: '',
  marca: '',
  conteudo: '',
  quantidade: '',
  medida: ''
})

const courseForm = reactive({
  code: null,
  name: ''
})
const message = ref('')
const config = useRuntimeConfig()
const api = config.public.API_URL

async function create() {
  const requestOptions = {
    method: 'POST',
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(prodForm)
  }

  const { error } = await useFetch(`${api}/products`, requestOptions)
  if (!error.value) {
    // Use router to navigate to a different route
    // Make sure you have defined a route with path '/' in your Vue Router setup
    router.push('/')
  } else {
    message.value = error.value
  }
}

</script>