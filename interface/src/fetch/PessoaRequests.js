class PessoaRequests {

    constructor() {
        this.serverUrl = 'http://localhost:3333';
        this.routeListarPessoas = '/pessoas';
    }
    getAuthToken() {
        return localStorage.getItem('token');
    }
    async listarPessoas() {
        const token = this.getAuthToken();

        try {
            const response = await fetch(`${this.serverUrl}${this.routeListarPessoas}`, {
                headers: {
                    'x-access-token': `${token}`
                }
            });

            if(!response.ok) {
                throw new Error('Não foi possível listar as pessoas.');
            }

            return response.json();
        } catch (error) {
            console.error(`Erro ao fazer consulta à API: ${error}`);
            return null;
        }
    }

}

export default new PessoaRequests();