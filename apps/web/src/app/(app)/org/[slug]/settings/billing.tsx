import { getCurrentOrg } from '@/auth/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getBilling } from '@/http/get-billing'

export async function Billing() {
  const currentOrg = getCurrentOrg()
  const { billing } = await getBilling(currentOrg!)
  return (
    <>
      <Separator />
      <Card>
        <CardHeader>
          <CardTitle>Fatura</CardTitle>
          <CardDescription>
            Informação sobre os custos de sua organização
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo de Custo</TableHead>
                <TableHead className="text-center" style={{ width: 120 }}>
                  Quantidade
                </TableHead>
                <TableHead className="text-right" style={{ width: 200 }}>
                  Subtotal
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Total de projetos</TableCell>
                <TableCell className="text-center">
                  {billing.projects.amount}
                </TableCell>
                <TableCell className="text-right">
                  {billing.projects.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}{' '}
                  (
                  {billing.projects.unit.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}{' '}
                  cada)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total de usuários</TableCell>
                <TableCell className="text-center">
                  {billing.seats.amount}
                </TableCell>
                <TableCell className="text-right">
                  {billing.seats.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}{' '}
                  (
                  {billing.seats.unit.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}{' '}
                  cada)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell />
                <TableCell className="text-right">Total</TableCell>
                <TableCell className="text-right">
                  {billing.total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
