import React from "react";
import { useState, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilterData, delOrder } from "../../../../store/slices/orderSlice";
import { logout } from "../../../../store/slices/userSlice";
import { makeUrl } from "./components/makeUrl";
import HeaderTable from "./components/HeaderTable";
import BodyTable from "./components/BodyTable";
import ModalDelete from "./components/ModalDelete";
import ModalDetails from "./components/ModalDetails";
import Pagination from "./components/pagination/Pagination";
import { changeDateFormat } from "../../../../utils/formatDate";
import { columnsTable } from "./components/columns";
import { useNavigate } from "react-router-dom";
import "./index.css";

const TableReport = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [PageSize, setPageSize] = useState(25);
  let offset = (currentPage - 1) * PageSize;
  const totalPages = useSelector((state) => state.order.total);
  // const loading = useSelector((state) => state.data.loading);

  if (currentPage - 1 > totalPages / PageSize) {
    setCurrentPage(1);
  }
  // get data redux and filter data
  const data = useSelector(
    (state) =>
      state.order.order &&
      state.order.order.map(
        ({ id, telegram_chat_id, created_on, date, ...rest }, index) => {
          return {
            num: PageSize * (currentPage - 1) + index + 1,
            id,
            date: changeDateFormat(date),
            ...rest,
          };
        }
      )
  );
  // state modal delete
  const [modalDeleteState, setModalDetele] = useState({
    visible: false,
    item: {},
  });
  // request detele Modal
  const onCloseDelete = () =>
    setModalDetele(() => {
      return {
        item: {},
        visible: false,
      };
    });
  // state modal details
  const [modalDetailsState, setModalDetails] = useState({
    visible: false,
    item: {},
  });
  // request detele Modal
  const onCloseDetails = () =>
    setModalDetails(() => {
      return {
        item: {},
        visible: false,
      };
    });
  // first date
  const formatDate = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}`;
  };
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const todayFormatted = formatDate(today);
  const nextWeekFormatted = formatDate(nextWeek);
  //  state filters
  const [dataInput, setDataInput] = useState({
    dateMin: todayFormatted,
    dateMax: nextWeekFormatted,
  });

  // input onChannge
  const onChangeData = (name, data) => {
    setDataInput((dataInput) => ({
      ...dataInput,
      [name]: data,
    }));
  };

  // request by filter data
  useEffect(() => {
    dispatch(getFilterData({ body: makeUrl(dataInput), offset }));
  }, [dataInput, currentPage]);

  const getDeleteModal = () => {
    dispatch(
      delOrder({
        id: modalDeleteState.item.id,
        body: makeUrl(dataInput),
        offset,
      })
    );

    onCloseDelete();
  };

  return (
    <div className="wrapper_table">
      {/* {loading && <Spinner />} */}
      <ModalDelete
        modalDeleteState={modalDeleteState}
        onCloseDelete={onCloseDelete}
        getDeleteModal={getDeleteModal}
      />
      <ModalDetails modalState={modalDetailsState} onClose={onCloseDetails} />
      <div className="table_button_wrapper">
        <div></div>

        <button
          onClick={() => {
            dispatch(logout());
            navigate("/");
          }}
        >
          Exit
        </button>
      </div>
      {data && (
        <>
          <table>
            <thead>
              <tr>
                <HeaderTable
                  dataInput={dataInput}
                  onChangeData={onChangeData}
                  columns={columnsTable}
                />
              </tr>
            </thead>
            <tbody>
              <BodyTable
                setModalDetele={setModalDetele}
                setModalDetails={setModalDetails}
                data={data}
                columns={columnsTable}
              />
            </tbody>
          </table>
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={totalPages}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  );
});

export default TableReport;
