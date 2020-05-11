<?php

namespace App\Traits;

use Illuminate\Container\Container;

/**
 * This trait can be used on a Mailable class to get the mailable's plain text,
 * or for converting to an array that might be returned in an API request.
 */
trait ApiMailable
{
    public function getPlainText()
    {
        return $this->withLocale($this->locale, function () {
            $this->build();
            return $this->buildView()['text']->toHtml();
        });
    }

    public function toArray()
    {
        return $this->withLocale($this->locale, function () {
            Container::getInstance()->call([$this, 'build']);

            $mail = $this;
            return [
                'from' => $mail->from,
                'to' => $mail->to,
                'cc' => $mail->cc,
                'bcc' => $mail->bcc,
                'subject' => $mail->subject,
                'body' => $mail->getPlainText(),
            ];
        });
    }
}
