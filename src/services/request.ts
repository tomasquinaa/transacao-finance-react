import { ApiDeleteUser, ApiGetUser, ApiSignIn, ApiSignUp, ApiUpdateUser } from "../@types/Auth"
import { ApiDeleteTransaction, ApiGetDashboard, ApiGetTransaction, ApiGetTransactions, ApiNewTransaction, ApiUpdateTransaction, TransactionStatus } from "../@types/Transaction"
import { formatDate } from "../utils/formatDate"
import { api } from "./api"


// Auth
export const signUp = async (name: string, email: string, password: string) => {
    return await api<ApiSignUp>({
        endpoint: 'auth/signup', method: 'POST', data: { name, email, password }, withAuth: false 
    })
}

export const signIn = async (email: string, password: string) => {
    return await api<ApiSignIn>({
        endpoint: 'auth/signin', method: 'POST', data: { email, password }, withAuth: false 
    })
}

// USER
// Obter o usuario que esta logado - User
export const getUser = async () => {
    return await api<ApiGetUser>({
        endpoint: 'auth/me'
    })
}

// Update User
export const updateUser = async (name: string, email: string) => {
    return await api<ApiUpdateUser>({
        endpoint: 'users', method: 'PUT', data: { name, email }
    })
}

// Delete User
export const deleteUser = async () => {
    return await api<ApiDeleteUser>({
        endpoint: 'users', method: 'DELETE'
    })
}


// Transações

// Get Transacoes
export const getTransactions = async (page: number) => {
    return await api<ApiGetTransactions>({
        endpoint: 'transactions', data: { page }
    })
}

// Para identificar que transacoes eu quero
export const getTransaction = async (id: number) => {
    return await api<ApiGetTransaction>({
        endpoint: `transactions/${id}}`
    })
}

// new transaction
export const newTransaction = async (title: string, amount: number, status?: TransactionStatus) => {
    return await api<ApiNewTransaction>({
        endpoint: 'transactions', method: 'POST', data: { title, amount, status }
    })
}

export const updateTransaction = async (id: number, title: string, amount: number, status: TransactionStatus) => {
    return await api<ApiUpdateTransaction>({
        endpoint: `transactions/${id}`, method: 'PUT', data: { title, amount, status }
    })
}

export const deleteTransaction = async (id: number) => {
    return await api<ApiDeleteTransaction>({
        endpoint: `transactions/${id}`, method: 'DELETE'
    })
}

// Dashboard
export const getDashboard = async (month: string, year: string) => {
    const response = await api<ApiGetDashboard>({ endpoint: 'dashboard' })

    let balance = 0
    let pending_transactions = response.data?.pending_transactions ?? 0
    let completed_transactions = response.data?.completed_transactions ?? 0

    if (response.data) {
        response.data.transactions.map(transaction => {
            const date = formatDate(transaction.created_at).split('/')

            if (date[1] == month && date[2] == year) balance += transaction.amount
        })
    }

    return { balance, pending_transactions, completed_transactions }
}




