<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h2>Produtos</h2>
        <table class="table">
          <thead>
            <tr>
              <th scope="col" >Nome</th>
              <th scope="col" >Marca</th>
              <th scope="col" >Preço</th>
              <th scope="col" >Quantidade</th>
              <th scope="col">Fornecedor</th>
              <th scope="col" >Adicionar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="produto in products">
              <td class="pt-3">{{ produto.nome }}</td>
              <td class="pt-3">{{ produto.marca }}</td>
              <td class="pt-3">{{ produto.preco }} €</td>
              <td class="pt-3">{{ produto.quantidade }} {{ produto.medida }}</td>
              <td class="pt-3">{{ produto.fornecedor }}</td>
              <td><button class="btn btn-success" @click="addProdutoToCarrinho(produto)" :disabled="isProductInCart(produto)"><i class="bi bi-plus-circle"></i></button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col">
        <h2>Produtos no carrinho</h2>
        <table class="table">
          <thead>
          <tr>
            <th scope="col" >Nome</th>
            <th scope="col" >Marca</th>
            <th scope="col">Preço</th>
            <th scope="col" >Quantidade</th>
            <th scope="col">Fornecedor</th>
            <th scope="col">Unidades</th>
            <th scope="col">Remover</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="produto in productsCarrinho" :key="produto.id">
              <td class="pt-3">{{ produto.nome }}</td>
              <td class="pt-3">{{ produto.marca }}</td>
              <td class="pt-3">{{ produto.preco }} €</td>
              <td class="pt-3">{{ produto.quantidade }} {{ produto.medida }}</td>
              <td class="pt-3">{{ produto.fornecedor }}</td>
              <td>
                <input class="form-check-input w-50" style="height: 2rem" type="number" v-model="produto.unidades" min="1">
              </td>
              <td><button class="btn btn-danger" @click="removeProdutoFromCarrinho(produto.id)"><i class="bi bi-x-circle"></i></button></td>
            </tr>
          </tbody>
        </table>
        <div class="align-self-end">
          <button class="btn btn-success me-3"> Finalizar encomenda</button>
          <button class="btn btn-danger" @click="clearCarrinho"> Limpar carrinho</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const config = useRuntimeConfig()
const api = config.public.API_URL
//const {data: products, error, refresh} = await useFetch(`${api}/products`)
const products = ref([
  { id: 1, nome: 'Produto 1', marca: 'Marca A', preco: '10', fornecedor: 'Fornecedor X', quantidade: "330", medida:"ml" },
  { id: 2, nome: 'Produto 2', marca: 'Marca B', preco: '20',fornecedor: 'Fornecedor Y', quantidade: "1", medida:"L"  },
  { id: 3, nome: 'Produto 2', marca: 'Marca B', preco: '20',fornecedor: 'Fornecedor Y', quantidade: "1", medida:"L"  },
  { id: 4, nome: 'Produto 2', marca: 'Marca B', preco: '20',fornecedor: 'Fornecedor Y', quantidade: "1", medida:"L"  },
  { id: 5, nome: 'Produto 2', marca: 'Marca B', preco: '20',fornecedor: 'Fornecedor Y', quantidade: "1", medida:"L"  },
  { id: 6, nome: 'Produto 2', marca: 'Marca B', preco: '20',fornecedor: 'Fornecedor Y', quantidade: "1", medida:"L"  },
  { id: 7, nome: 'Produto 2', marca: 'Marca B', preco: '20',fornecedor: 'Fornecedor Y', quantidade: "1", medida:"L"  },
  { id: 8, nome: 'Produto 2', marca: 'Marca B', preco: '20',fornecedor: 'Fornecedor Y', quantidade: "1", medida:"L"  },
  { id: 9, nome: 'Produto 2', marca: 'Marca B', preco: '20',fornecedor: 'Fornecedor Y', quantidade: "1", medida:"L"  },
  { id: 10, nome: 'Produto 2', marca: 'Marca B', preco: '20',fornecedor: 'Fornecedor Y', quantidade: "1", medida:"L"  },
  { id: 11, nome: 'Produto 2', marca: 'Marca B', preco: '20',fornecedor: 'Fornecedor Y', quantidade: "1", medida:"L"  },
  { id: 12, nome: 'Produto 2', marca: 'Marca B', preco: '20',fornecedor: 'Fornecedor Y', quantidade: "1", medida:"L"  }]);
const productsCarrinho = ref([]);

function addProdutoToCarrinho(produto) {
  const existingProduct = productsCarrinho.value.find(p => p.id === produto.id);
  if (!existingProduct) {
    produto.unidades = 1;
    productsCarrinho.value.push({...produto});
  }}

function removeProdutoFromCarrinho(productId) {
  productsCarrinho.value = productsCarrinho.value.filter(p => p.id !== productId);
}


function clearCarrinho() {
  productsCarrinho.value = [];
}

function isProductInCart(produto) {
  return productsCarrinho.value.some(p => p.id === produto.id);
}
</script>