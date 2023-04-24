import { useEffect, useState } from "react";
import api from "../../services/Api";
import DataTable, { TableColumn } from "react-data-table-component"
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

interface DataRow{
    id: number;
    name: string;
    email: string;
    role: string;
    type: any;
    isEnabled: boolean;
}

function ListarUsuarios(){
    const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [totalRows, setTotalRows] = useState(0);
    const [actualPage, setActualPage] = useState(1)
	const [perPage, setPerPage] = useState(20);
    const navigate = useNavigate();

    const columns : TableColumn<DataRow>[] = [
        {
            id: "name",
            name: "Nome",
            selector: row => row.name,
        },
        {
            id: "email",
            name: "Email",
            selector: row => row.email,
        },
        {
            id: "role",
            name: "Role",
            selector: row => row.role,
        },
        {
            id: "type",
            name: "Type",
            selector: row => typeName(row.type),
        },
        {
            id: "isEnable",
            name: "Ativo",
            selector: row => (row.isEnabled === true ? 'Ativo' : 'Inativo'),
        },

    ]

    function typeName(type: Number){
        switch(type){
            case 10:
                return 'Pessoa Física'

            case 20:
                return 'Instituição Privada'
            
            case 30:
                return 'Instituição Pública'

            case 40:
                return 'Outros'

            default:
                return 'Não Definido'
        }
    }

	async function fetchUsers () {
		setLoading(true);

		const response = await api.get('/api/Users')

		setData(response.data);
		setTotalRows(response.data.totalItems);
		setLoading(false);
	};

	async function handlePageChange(page:number) {
		setLoading(true)
        var response
        actualPage < page ? response = await api.get(`${data.nextPageUrl.split(22)}`) : response = await api.get(`${data.previousPageUrl.split(22)}`)
        console.log(response)
        setData(response.data)
        setActualPage(response.data.pageNumber)
        setLoading(false)
	};

	async function handlePerRowsChange(newPerPage:number) {
		setLoading(true)
        const response = await api.get(`/api/Users?pageSize=${newPerPage}`)
        setData(response.data)
        setPerPage(newPerPage)
        setLoading(false)
	};

    const handleRowClicked = (row : any) => {
        navigate('/editar-usuario', { state: { userId: row.id } });
    }

	useEffect(() => {
		fetchUsers(); // fetch page 1 of users
	}, []);

    return(
        <div>
            <DataTable
                title="Usuários"
                columns={columns}
                data={data?.data}
                progressPending={loading}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handlePerRowsChange}
                onRowClicked={handleRowClicked}
                pointerOnHover={true}
                highlightOnHover={true}
            />
        </div>
    )

}

export default ListarUsuarios;