﻿import { Button, Grid, Typography } from "@mui/material";
import CategoriesContent from "../../../layouts/CategoriesContent";
import Image from "../../../components/Image";
import ChoosePicture from "../../../components/ChoosePicture";
import Genre from "../../../models/api/genre";
import BasicTextField from "../../../components/BasicTextField";
import ChooseFile from "../../../components/ChooseFile";
import SelectEbookGenre from "../../../components/SelectEbookGenre";
import FormService from "../../../services/FormService";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import EbookService, { CreateEbookProps } from "../../../services/EbookService";
import { NotificationContext } from "../../../context/NotificationContext";
import { UserContext } from "../../../context/UserContext";
import Loading from "../../../pages/Loading";
import FileService from "../../../services/FileService";

interface FormProps {
  title?: string;
  genre?: Genre;
  description?: string;
  pageNumber?: number;
  content?: string;
  picture?: string;
  prize?: number;
}

interface FormErrors {
  title: string;
  genre: string;
  description: string;
  pageNumber: string;
  content: string;
  prize: string;
}

const initErrors: FormErrors = {
  title: "",
  genre: "",
  description: "",
  pageNumber: "",
  content: "",
  prize: "",
};

const CreateEbook = () => {
  const user = useContext(UserContext)?.user.data;

  const notificationContext = useContext(NotificationContext);

  const [form, setForm] = useState<FormProps>({});

  const [errors, setErrors] = useState<FormErrors>(initErrors);

  const navigate = useNavigate();

  const CREATED_SUCCESSFULY_MESSAGE = "Utworzono ebooka";
  const CREATED_FAILED_MESSAGE = "Nie udało się utworzyć ebooka";

  if (!user) {
    return <Loading />;
  }

  const validateForm = () => {
    let newErrors: FormErrors = { ...initErrors };

    let passedValidation = true;

    if (!FormService.checkIfIsRequired(form.title)) {
      passedValidation = false;
      newErrors.title = FormService.requiredMessage;
    }

    if (!form.genre) {
      passedValidation = false;
      newErrors.genre = FormService.requiredMessage;
    }

    if (!FormService.checkIfIsRequired(form.description)) {
      passedValidation = false;
      newErrors.description = FormService.requiredMessage;
    }

    if (
      !FormService.checkIfIsRequired(
        form.pageNumber ? form.pageNumber.toString() : undefined
      )
    ) {
      passedValidation = false;
      newErrors.pageNumber = FormService.requiredMessage;
    }

    if (!FormService.checkIfIsRequired(form.content)) {
      passedValidation = false;
      newErrors.content = FormService.requiredMessage;
    }

    if (
      !FormService.checkIfIsRequired(
        form.prize ? form.prize.toString() : undefined
      )
    ) {
      passedValidation = false;
      newErrors.prize = FormService.requiredMessage;
    }

    setErrors(newErrors);

    return passedValidation;
  };

  const handleCreate = () => {
    if (!validateForm()) {
      return;
    }

    EbookService.create({
      ...form,
      picture: FileService.splitBase64(form.picture),
      content: FileService.splitBase64(form.content),
      author: user,
    } as CreateEbookProps)
      .then(() => {
        navigate("/account-settings/authors-panel");
        notificationContext?.setNotification({
          isVisible: true,
          isSuccessful: true,
          message: CREATED_SUCCESSFULY_MESSAGE,
        });
      })
      .catch((error) => {
        console.log(error);
        notificationContext?.setNotification({
          isVisible: true,
          isSuccessful: false,
          message: CREATED_FAILED_MESSAGE,
        });
      });
  };

  return (
    <CategoriesContent>
      <Grid item container direction="column" rowGap={3}>
        <Grid item container columnGap={6}>
          <Grid
            item
            xs={3}
            container
            direction="column"
            alignItems="center"
            rowGap={2}
          >
            <Grid
              item
              container
              className="pointer"
              height="320px"
              width="220px"
              justifyContent="center"
              alignItems="center"
              border="1px solid black"
            >
              {form?.picture && (
                <Image
                  alt={form.title}
                  src={form.picture}
                  style={{ maxWidth: "100%", width: "auto", height: "100%" }}
                />
              )}
              <ChoosePicture
                file={form?.picture}
                handleSelectFile={(file: string) => {
                  setForm({ ...form, picture: file });
                }}
              />
            </Grid>
            <Typography>Sugerowane wymiary okładki: 320px / 220px</Typography>
          </Grid>
          <Grid item xs={4} container direction="column" rowGap={2}>
            <BasicTextField
              label="Tytuł"
              value={form.title}
              isRequired={true}
              errorMessage={errors.title}
              handleChange={(value: string) => {
                setForm({ ...form, title: value });
                setErrors({ ...errors, title: "" });
              }}
              disableSpaceBetween={true}
              fullWidth={true}
              formSize={10}
            />
            <ChooseFile
              label="Plik z ebookiem"
              isRequired={true}
              errorMessage={errors.content}
              handleSelectFile={(file: string) => {
                setForm({ ...form, content: file });
                setErrors({ ...errors, content: "" });
              }}
            />
            <SelectEbookGenre
              label="Kategoria"
              selectedGenreId={form.genre?.id}
              isRequired={true}
              errorMessage={errors.genre}
              formSize={6}
              handleOnChange={(genre: Genre) => {
                setForm({ ...form, genre: genre });
                setErrors({ ...errors, genre: "" });
              }}
            />
            <BasicTextField
              label="Liczba stron"
              value={form.pageNumber?.toString()}
              settings={{
                type: "number",
                inputProps: {
                  min: 0,
                },
              }}
              isRequired={true}
              errorMessage={errors.pageNumber}
              handleChange={(value: string) => {
                setForm({ ...form, pageNumber: +value });
                setErrors({ ...errors, pageNumber: "" });
              }}
              disableSpaceBetween={true}
              fullWidth={true}
              formSize={5}
            />
            <BasicTextField
              label="Cena"
              value={form.prize?.toString()}
              settings={{
                type: "number",
                inputProps: {
                  min: 0,
                },
              }}
              isRequired={true}
              errorMessage={errors.prize}
              handleChange={(value: string) => {
                setForm({ ...form, prize: +value });
                setErrors({ ...errors, prize: "" });
              }}
              disableSpaceBetween={true}
              fullWidth={true}
              formSize={5}
            />
          </Grid>
        </Grid>
        <Grid item>
          <BasicTextField
            label="Opis"
            value={form.description}
            settings={{
              multiline: true,
              rows: 20,
            }}
            isRequired={true}
            errorMessage={errors.description}
            handleChange={(value: string) => {
              setForm({ ...form, description: value });
              setErrors({ ...errors, description: "" });
            }}
            disableSpaceBetween={true}
            fullWidth={true}
            formSize={12}
          />
        </Grid>
        <Grid item container justifyContent="center" columnGap={8}>
          <Grid item xs={1}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => navigate("../account-settings/authors-panel")}
            >
              Anuluj
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Button fullWidth variant="contained" onClick={handleCreate}>
              Utwórz
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </CategoriesContent>
  );
};

export default CreateEbook;
