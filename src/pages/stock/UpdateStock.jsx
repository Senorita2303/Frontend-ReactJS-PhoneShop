import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../../component/layouts/MetaData/MetaData";
import Breadcrumb from '../../component/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../component/layouts/DefaultLayout';
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { Stack } from '@mui/material';
import LoadingButton from "@mui/lab/LoadingButton";
import FormProvider, { RHFTextField } from "../../component/hook-form";
import { paths } from "../../routes/paths";
import axios from "../../common";
function UpdateStock() {
    const navigate = useNavigate();
    const [inventory, setInventory] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        async function getInventory() {
            try {
                const { data } = await axios.get(`/api/inventory/${id}`);
                setInventory(data.inventory)
            } catch (error) {
                console.log(error)
            }
        }
        getInventory();
    }, []);

    const EditStockSchema = Yup.object().shape({
        addition: Yup.number("Addition quantity must be a number")
            .min(0, "Addition must be at least 0")
            .integer("Addition quantity must be an integer"),
        substraction: Yup.number("Substraction quantity must be a number")
            .min(0, "Substraction must be at least 0")
            .max(inventory?.stock, "Can't reduce more than product's stock")
            .integer("Substraction quantity must be an integer"),
    });

    const defaultValues = {
        addition: 0,
        substraction: 0
    };

    const methods = useForm({
        resolver: yupResolver(EditStockSchema),
        defaultValues,
    });

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        try {
            const status = data.addition ? 'in' : 'out';
            const qty = status === 'in' ? data.addition : data.substraction;
            const stock = status === 'in' ? inventory.stock + qty : inventory.stock - qty;
            const dataForm = {
                stock: stock,
                status: status,
                quantity: qty
            }
            const config = {
                headers: { "Content-Type": "application/json" },
            };
            const response = await axios.patch(`/api/inventory/${id}`, dataForm, config);
            if (response) {
                toast.success("Update stock successfully");
                navigate(paths.dashboard.manage.stock);
            }

        } catch (error) {
            toast.error(error.response.data.message);
            reset();
        }
    });

    return (
        <>
            <DefaultLayout>
                <MetaData title={"Update Stock"} />
                <Breadcrumb pageName="Update Stock" />
                <div className="flex justify-center items-center pt-28 pb-12 h-auto bg-white">
                    <div className="w-96 m-auto rounded p-8">
                        <FormProvider methods={methods} onSubmit={onSubmit}>
                            <Stack spacing={3}>
                                <RHFTextField name="addition" label="Addition" />
                                <RHFTextField name="substraction" label="Substraction" />
                                <LoadingButton
                                    fullWidth
                                    color="inherit"
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    loading={isSubmitting}
                                >
                                    Update Stock
                                </LoadingButton>
                            </Stack>
                        </FormProvider>
                    </div>
                </div>
            </DefaultLayout>
        </>
    );
}

export default UpdateStock;