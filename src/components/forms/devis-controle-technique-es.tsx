"use client";

import Link from "next/link";
import { useState } from "react";
import { MultiStepForm, FormField, isValidEmail, isValidPhone } from "../multi-step-form";
import { Input } from "@/components/ui/input";

const REQUEST_OPTIONS = [
  "ITV turismo",
  "ITV utilitario",
  "Necesito que me llamen",
] as const;

const KNOWN_ISSUES = [
  "Neumáticos",
  "Frenos",
  "Cambio de aceite / mantenimiento",
  "Alineación / comportamiento en carretera",
  "Testigo / otro problema",
] as const;

const DELIVERY_OPTIONS = [
  "Dejar el vehículo en el taller",
  "Recibir una llamada primero",
] as const;

type ControlTecnicoEsData = {
  tipoSolicitud: string;
  matricula: string;
  modelo: string;
  fechaLimiteCt: string;
  puntosConocidos: string[];
  circulaNormalmente: string;
  preferenciaGestion: string;
  apellido: string;
  nombre: string;
  telefono: string;
  email: string;
  codigoPostal: string;
  mensaje: string;
};

const initial: ControlTecnicoEsData = {
  tipoSolicitud: "ITV turismo",
  matricula: "",
  modelo: "",
  fechaLimiteCt: "",
  puntosConocidos: [],
  circulaNormalmente: "Sí",
  preferenciaGestion: "Dejar el vehículo en el taller",
  apellido: "",
  nombre: "",
  telefono: "",
  email: "",
  codigoPostal: "",
  mensaje: "",
};

export function DevisControleTechniqueFormEs() {
  const [data, setData] = useState<ControlTecnicoEsData>(initial);

  const update = <K extends keyof ControlTecnicoEsData>(
    key: K,
    value: ControlTecnicoEsData[K],
  ) => setData((prev) => ({ ...prev, [key]: value }));

  const toggleKnownIssue = (value: string) => {
    setData((prev) => ({
      ...prev,
      puntosConocidos: prev.puntosConocidos.includes(value)
        ? prev.puntosConocidos.filter((item) => item !== value)
        : [...prev.puntosConocidos, value],
    }));
  };

  const selectClass =
    "w-full h-11 rounded-xl border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-bright";

  const isValid = (step: number) => {
    if (step === 0) return true;
    if (step === 1) return isValidPhone(data.telefono) && isValidEmail(data.email);
    return true;
  };

  return (
    <MultiStepForm
      id="devis-ct-form-es"
      serviceType="mecanique"
      successHref="/es/gracias-control-tecnico"
      data={{
        ...data,
        service: "ITV / control técnico",
        source_detail: "controle_technique_es",
      }}
      isValid={isValid}
      submitLabel="Enviar mi solicitud"
      extraMention="El precontrol es gratuito. Si hay un punto bloqueante, recibirás un presupuesto antes de cualquier reparación."
      rgpdText={
        <>
          Al enviar este formulario, acepto que Recacor trate mis datos para gestionar mi solicitud. {" "}
          <Link href="/confidentialite" className="text-blue-700 hover:underline">
            Política de privacidad
          </Link>
        </>
      }
      labels={{
        step: (current, total) => `Paso ${current} / ${total}`,
        summary: "Resumen",
        previous: "Volver",
        next: "Continuar",
        sending: "Enviando...",
        submitError: "No se ha podido confirmar la solicitud. Vuelve a intentarlo o llamanos directamente.",
      }}
      steps={[
        {
        title: "Tu vehículo y tu solicitud",
          subtitle: "Unos datos son suficientes para preparar la gestión",
          content: (
            <div className="space-y-4">
              <FormField label="Tipo de solicitud">
                <select
                  value={data.tipoSolicitud}
                  onChange={(e) => update("tipoSolicitud", e.target.value)}
                  className={selectClass}
                >
                  {REQUEST_OPTIONS.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </FormField>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Matrícula">
                  <Input
                    placeholder="AB-482-CT"
                    value={data.matricula}
                    onChange={(e) => update("matricula", e.target.value.toUpperCase())}
                    className="h-11"
                  />
                </FormField>
                <FormField label="Marca / modelo">
                  <Input
                    placeholder="ej. Renault Clio"
                    value={data.modelo}
                    onChange={(e) => update("modelo", e.target.value)}
                    className="h-11"
                  />
                </FormField>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Fecha límite de la ITV / control técnico">
                  <Input
                    type="date"
                    value={data.fechaLimiteCt}
                    onChange={(e) => update("fechaLimiteCt", e.target.value)}
                    className="h-11"
                  />
                </FormField>
                <FormField label="¿El vehículo funciona con normalidad?">
                  <select
                    value={data.circulaNormalmente}
                    onChange={(e) => update("circulaNormalmente", e.target.value)}
                    className={selectClass}
                  >
                    <option>Sí</option>
                    <option>No</option>
                  </select>
                </FormField>
              </div>
                <FormField label="Problemas ya conocidos">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {KNOWN_ISSUES.map((issue) => (
                    <label
                      key={issue}
                      className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-foreground"
                    >
                      <input
                        type="checkbox"
                        checked={data.puntosConocidos.includes(issue)}
                        onChange={() => toggleKnownIssue(issue)}
                        className="h-4 w-4 accent-purple-bright"
                      />
                      <span>{issue}</span>
                    </label>
                  ))}
                </div>
              </FormField>
                <FormField label="Preferencia de gestión">
                <select
                  value={data.preferenciaGestion}
                  onChange={(e) => update("preferenciaGestion", e.target.value)}
                  className={selectClass}
                >
                  {DELIVERY_OPTIONS.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </FormField>
            </div>
          ),
        },
        {
          title: "Tus datos de contacto",
          subtitle: "Necesitamos tu teléfono y tu email para llamarte",
          content: (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <FormField label="Apellido">
                  <Input
                    value={data.apellido}
                    onChange={(e) => update("apellido", e.target.value)}
                    className="h-11"
                  />
                </FormField>
                <FormField label="Nombre">
                  <Input
                    value={data.nombre}
                    onChange={(e) => update("nombre", e.target.value)}
                    className="h-11"
                  />
                </FormField>
              </div>
              <FormField label="Teléfono" required>
                <Input
                  type="tel"
                  placeholder="06 00 00 00 00"
                  value={data.telefono}
                  onChange={(e) => update("telefono", e.target.value)}
                  className="h-11"
                />
              </FormField>
              <FormField label="Email" required>
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={data.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="h-11"
                />
              </FormField>
              <FormField label="Código postal">
                <Input
                  placeholder="34920"
                  maxLength={5}
                  value={data.codigoPostal}
                  onChange={(e) => update("codigoPostal", e.target.value)}
                  className="h-11"
                />
              </FormField>
              <FormField label="Mensaje (opcional)">
                <textarea
                  rows={4}
                  maxLength={700}
                  value={data.mensaje}
                  onChange={(e) => update("mensaje", e.target.value)}
                  placeholder="Indica si la fecha de la ITV está cerca o si hay algún punto que te preocupa."
                  className="w-full resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-bright"
                />
              </FormField>
            </div>
          ),
        },
        { title: "Confirmación", content: null },
      ]}
      summary={
        <dl className="space-y-1.5 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Solicitud</dt>
            <dd className="max-w-[60%] text-right font-semibold">{data.tipoSolicitud}</dd>
          </div>
          {data.modelo && (
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Vehículo</dt>
              <dd className="max-w-[60%] text-right font-semibold">{data.modelo}</dd>
            </div>
          )}
          {data.matricula && (
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Matrícula</dt>
              <dd className="font-semibold">{data.matricula}</dd>
            </div>
          )}
          {data.fechaLimiteCt && (
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Fecha límite ITV</dt>
              <dd className="font-semibold">{data.fechaLimiteCt}</dd>
            </div>
          )}
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Teléfono</dt>
            <dd className="font-semibold">{data.telefono}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Email</dt>
            <dd className="max-w-[60%] truncate text-right font-semibold">{data.email}</dd>
          </div>
        </dl>
      }
    />
  );
}
