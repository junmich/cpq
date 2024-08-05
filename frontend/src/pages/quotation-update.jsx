import { Helmet } from 'react-helmet-async';

import { QuotationUpdateView } from 'src/sections/quotation-update/view';

// ----------------------------------------------------------------------

export default function QuotationUpdatePage() {
  return (
    <>
      <Helmet>
        <title> Quotation Update | Exam Alpha </title>
      </Helmet>

      <QuotationUpdateView />
    </>
  );
}
