import { Helmet } from 'react-helmet-async';

import { QuotationPrintView } from 'src/sections/quotation-print/view';

// ----------------------------------------------------------------------

export default function QuotationUpdatePage() {
  return (
    <>
      <Helmet>
        <title> Quotation Update | Exam Alpha </title>
      </Helmet>

      <QuotationPrintView />
    </>
  );
}
