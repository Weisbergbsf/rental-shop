import React from "react";
import { Tag } from "antd";
import moment from "moment";

export const columnsTable = [
  {
    title: "ID",
    dataIndex: "id"
  },
  {
    title: "Data do Contrato",
    dataIndex: "dateStart",
    render: date => {
      if (date) {
        return moment(new Date(date)).format("DD/MM/YYYY HH:mm");
      }
    }
  },
  {
    title: "Data fim Contrato",
    dataIndex: "dateEnd",
    render: date => {
      if (date) {
        return moment(new Date(date)).format("DD/MM/YYYY HH:mm");
      }
    }
  },
  {
    title: "Status do Contrato",
    dataIndex: "contractStatus",
    //RESERVED(1), RENTED(2), RETURNED(3), CANCELED(4);
    render: status => {
      let color = "green";
      let nameStatus = "Alugado";
      if (status === "RETURNED") {
        color = "orange";
        nameStatus = "Devolvido";
      }
      if (status === "RESERVED") {
        color = "blue";
        nameStatus = "Reservado";
      }
      if (status === "CANCELED") {
        color = "red";
        nameStatus = "Cancelado";
      }
      return (
        <Tag color={color} key={status}>
          {nameStatus.toUpperCase()}
        </Tag>
      );
    }
  }
];
