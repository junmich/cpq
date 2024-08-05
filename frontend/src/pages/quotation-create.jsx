import { Helmet } from 'react-helmet-async';

import { QuotationCreateView } from 'src/sections/quotation-create/view';

// ----------------------------------------------------------------------

export default function QuotationPage() {
  return (
    <>
      <Helmet>
        <title> Quotation | Exam Alpha </title>
      </Helmet>

      <QuotationCreateView />
    </>
  );
}
