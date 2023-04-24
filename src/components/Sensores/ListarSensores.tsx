import { useEffect, useState } from "react";
import api from "../../services/Api";
import DataTable, { TableColumn } from "react-data-table-component"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface DataRow{
    id: number;
    name: string;
    measurementUnit: string;
    minimum: number;
    maximum: number;
    accuracy: number;
    isEnable: boolean;
}

function ListarSensores(){
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
            id: "measurementUnit",
            name: "Unidade de Mensuração",
            selector: row => row.measurementUnit,
        },
        {
            id: "minimum",
            name: "Minimo",
            selector: row => row.minimum,
        },
        {
            id: "maximum",
            name: "Maximo",
            selector: row => row.maximum,
        },
        {
            id: "accuracy",
            name: "Acurácia",
            selector: row => row.accuracy,
        },
    ]

	async function fetchUsers () {
		setLoading(true);

		const response = await api.get('/api/Sensors')

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
        const response = await api.get(`/api/Sensors?pageSize=${newPerPage}`)
        setData(response.data)
        setPerPage(newPerPage)
        setLoading(false)
	};

    const handleRowClicked = (row : any) => {
        navigate('/editar-sensor', { state: { id: row.id } });
        console.log(row)
    }

	useEffect(() => {
		fetchUsers(); // fetch page 1 of users
		
	}, []);

    return(
        <div>
            <DataTable
                title="Sensores"
                columns={columns}
                data={data?.data}
                progressPending={loading}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handlePerRowsChange}
                onRowClicked={handleRowClicked}
            />
        </div>
    )

}

export default ListarSensores;