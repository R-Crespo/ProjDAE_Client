<template>
  <div class="input-group ms-2 d-flex justify-content-around" >
    <div>
      <h1 class="d-flex justify-content-center">Produto #1</h1>
      <br>
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
    <div class="d-flex justify-content-end w-50">
      <div>
        <div class="d-flex flex-row justify-content-end">
          <h1 class="d-flex justify-content-center">Regras Produto #{{ produto.id }}</h1>
          <button @click="addRegra" class="btn btn-success ms-5 mt-2 mb-2">Add Regra</button>
        </div>
        <div v-for="(regra, index) in regras" :key="regra.id" class="d-flex flex-row mt-3 align-content-end">
          <input type="number" v-model="regra.id" class="form-control ms-2 mb-2 w-25 h-100" disabled>
          <input type="number" v-model="regra.valor" class="form-control ms-2 mb-2 w-25  h-100" placeholder="Valor">
          <input type="text" v-model="regra.comparador" class="form-control ms-2 mb-2 w-50  h-100" placeholder="Comparador">
          <textarea type="text" v-model="regra.mensagem" class="form-control ms-2 mb-2 w-50" placeholder="Mensagem" rows="1"></textarea>
          <input type="text" v-model="regra.tipo_sensor" class="form-control ms-2 mb-2 w-50 h-100" placeholder="Tipo de Sensor">
          <button @click="removeRegra(regra.id)" class="btn btn-danger ms-2 mb-2  h-100"><i class="bi bi-x-circle"></i></button>
        </div>
      </div>
    </div>
  </div>
    <div class="col mt-5">
      <h2>Sensores</h2>
      <br>
      <table class="table">
        <thead>
        <tr>
          <th scope="col">Sensor</th>
          <th scope="col">Data</th>
          <th scope="col">Valor</th>
          <th scope="col">Estado</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="obs in observacoes">
          <td class="pt-3">{{ obs.sensor }}</td>
          <td class="pt-3">{{ obs.timestamp }}</td>
          <td class="pt-3">{{ obs.valor }} {{ obs.unidade }}</td>
          <td class="pt-3"><button class="btn" :class="estadoClass(obs.estado)" @click="">{{ obs.estado }}</button></td>
        </tr>
        </tbody>
      </table>
    </div>
  {{ message }}
</template>
<script setup>
import { useRouter } from 'vue-router'
import {computed, ref} from 'vue';
const router = useRouter()

const produto = ref({ id: 1, nome: 'Produto 1', marca: 'Marca A', preco: '10', fornecedor: 'Fornecedor X', quantidade: "330", medida:"ml" })
const regras = ref([]);
const id = ref(0);


const observacoes = ref([
  { sensor: "Temperatura", timestamp: '10/12/2024,10:10', valor: '10', unidade: 'Cº', estado: 'OK' },
  { sensor: "Pressao", timestamp: '10/12/2024,10:10', valor: '0.5', unidade: 'Km',estado: 'OK' },
  { sensor: "Temperatura", timestamp: '10/12/2024,10:20', valor: '11', unidade: 'Cº', estado: 'OK' },
  { sensor: "Pressao", timestamp: '10/12/2024,10:20', valor: '0.5', unidade: 'Km',estado: 'OK' },
  { sensor: "Temperatura", timestamp: '10/12/2024,10:30', valor: '17', unidade: 'Cº', estado: 'Regra #2 violada' },
  { sensor: "Pressao", timestamp: '10/12/2024,10:30', valor: '0.3', unidade: 'Km',estado: 'OK' },
  { sensor: "Temperatura", timestamp: '10/12/2024,10:50', valor: '9', unidade: 'Cº', estado: 'OK' },
  { sensor: "Pressao", timestamp: '10/12/2024,10:50', valor: '0.8', unidade: 'Km',estado: 'Regra #3 violada' }]);

const message = ref('')
const config = useRuntimeConfig()
const api = config.public.API_URL

function addRegra() {
  const newRegra = {
    id: id.value,
    valor: 0,
    comparador: '',
    mensagem: '',
    tipo_sensor: ''
  };
  id.value += 1;
  regras.value.push(newRegra);
}

function removeRegra(regraId) {
  regras.value = regras.value.filter(r => r.id !== regraId);
}

function estadoClass(estado) {
  switch (estado){
    case "OK":
        return "btn-success disabled"
    default:
        return "btn-danger disabled"
  }
}
async function create() {

}

</script>