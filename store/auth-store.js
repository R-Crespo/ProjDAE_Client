import {defineStore} from "pinia";
import {computed} from "vue";

export const useAuthStore = defineStore("authStore", () => {
    const token = ref(null)
    const user = ref(null)
    const isFornecedor = computed(() => user.value?.tipo === "Fornecedor");
    const isOperador = computed(() => user.value?.tipo === "Operador");
    const isCliente = computed(() => user.value?.tipo === "Cliente");
    function logout() {
        token.value = null
        user.value = null
    }
    return { token, user, logout, isCliente, isFornecedor, isOperador }
})
