<?php
namespace App\Services\Auth;

use Lcobucci\JWT\Token;
use Lcobucci\JWT\Signer\Rsa\Sha256;
use App\Services\Auth\JwtKeysFetcher;

class JwtValidator {
    
    /**
     * Will fetch and cache JWT keys
     * @var JwtKeysFetcher 
     */
    protected $keyFetcher;
    
    /**
     * A map of valid Issuer->Audience pairs
     * @var array 
     */
    protected $validIssAud;
    
    public function __construct(JwtKeysFetcher $keyFetcher, array $validIssAud) {
        $this->keyFetcher = $keyFetcher;
        $this->validIssAud = $validIssAud;
    }
    
    public function validateTokenSignature(Token $token) {
        $kid = $token->getHeader("kid");
        $alg = $token->getHeader("alg");
        $publicKey = $this->keyFetcher->getByKID($kid);
        
        switch ($alg) {
            case "RS256":
                $signer = new Sha256();
                break;
            default:
                $signer = new Sha256();
                break;
        }

        $signatureIsValid = $token->verify($signer, $publicKey);
        return $signatureIsValid;
    }
    
    public function tokenIsExpired(Token $token) {
        return $token->isExpired();
    }
    
    public function validateTokenClaims(Token $token) {
        $iss = $token->getClaim("iss");
        $aud = $token->getClaim("aud");
        
        return array_has($this->validIssAud, $iss) && 
                $this->validIssAud[$iss] === $aud;
    }
}
