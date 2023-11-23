import * as Yup from 'yup'

export const incomeExpenseValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  amount: Yup.number().required('Amount is required').positive('Must be positive'),
  date: Yup.date().required('Date is required'),
  sourceId: Yup.number().required('Source is required').positive('Wrong ID').integer('Wrong ID'),
  userId: Yup.number().required('User is required').positive('Wrong ID').integer('Wrong ID')
})
