import { Helmet } from 'react-helmet-async';

import { QuotationView } from 'src/sections/quotation/view';

// ----------------------------------------------------------------------

export default function QuotationPage() {
  return (
    <>
      <Helmet>
        <title> Quotation | Exam Alpha </title>
      </Helmet>

      <QuotationView />
    </>
  );
}
