import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import MenuUtama from "./MenuUtama";
import Login from "./Auth/Login";
import Registrasi from "./Auth/Registrasi";
import Informasi from "./Container/Informasi";
import MenuUtamaPelanggan from "./Pelanggan/MenuUtamaPelanggan";
import Rating from "./Pelanggan/Service/Rating";
import Pemesanan from "./Pelanggan/Pemesanan";
import Detailsolsepatu from "./Pelanggan/Detailsolsepatu";
import PilihService from "./Pelanggan/Service/PilihService";
import DetailKonsultasi from "./Pelanggan/DetailKonsultasi";
import Images from "./Images";
import DetailRating from "./Pelanggan/Service/DetailRating";
import Pesan from "./Pelanggan/Pesan";
import MapsPelanggan from "./Pelanggan/MapsPelanggan";
import DetailPesanan from "./Pelanggan/DetailPesanan";
import Galerysolsepatu from "./Pelanggan/Galerysolsepatu";
import FotoMakeup from "./Pelanggan/FotoMakeup";

import Tentang from "./Tentang";

//sol sepatu

import MenuUtamaSolSepatu from "./AdminSolSepatu/MenuUtamaSolSepatu";
import PemesananSolSepatu from "./AdminSolSepatu/PemesananSolSepatu";
import JenisJasa from "./AdminSolSepatu/JenisJasa";
import TambahJasa from "./AdminSolSepatu/TambahJasa";
import DetailPemesananSolSepatu from "./AdminSolSepatu/DetailPesananSolSepatu";
import EditJasa from "./AdminSolSepatu/EditJasa";
import FotoSolSepatu from "./AdminSolSepatu/FotoSolSepatu";
import FotoMakeupsolsepatu from "./AdminSolSepatu/FotoMakeupsolsepatu";
import EditProfil from "./AdminSolSepatu/EditProfil";
import EditGalerysolsepatu from "./AdminSolSepatu/EditGalery";

const Routes = createStackNavigator(
  {
    MenuUtama: {
      screen: MenuUtama
    },
    Login: {
      screen: Login
    },
    Registrasi: {
      screen: Registrasi
    },
    Informasi: {
      screen: Informasi
    },
    MenuUtamaPelanggan: {
      screen: MenuUtamaPelanggan
    },
    Rating: {
      screen: Rating
    },
    Pemesanan: {
      screen: Pemesanan
    },
    Detailsolsepatu: {
      screen: Detailsolsepatu
    },
    PilihService: {
      screen: PilihService
    },
    DetailKonsultasi: {
      screen: DetailKonsultasi
    },
    DetailRating: {
      screen: DetailRating
    },
    Tentang: {
      screen: Tentang
    },
    Pesan: {
      screen: Pesan
    },
    MapsPelanggan: {
      screen: MapsPelanggan
    },
    DetailPesanan: DetailPesanan,
    MenuUtamaSolSepatu: MenuUtamaSolSepatu,
    PemesananSolSepatu: PemesananSolSepatu,
    JenisJasa: JenisJasa,
    TambahJasa: TambahJasa,
    DetailPemesananSolSepatu: DetailPemesananSolSepatu,
    EditJasa: EditJasa,
    Galerysolsepatu: Galerysolsepatu,
    FotoMakeup: FotoMakeup,
    FotoSolSepatu: FotoSolSepatu,
    FotoMakeupsolsepatu: FotoMakeupsolsepatu,
    EditProfil: EditProfil,
    EditGalerysolsepatu: EditGalerysolsepatu
  },
  {
    initialRouteName: "MenuUtama"
  }
);

export default createAppContainer(Routes);
