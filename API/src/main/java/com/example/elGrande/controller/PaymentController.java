package com.example.elGrande.controller;


import com.example.elGrande.entity.Campaign;
import com.example.elGrande.entity.Opinion;
import com.example.elGrande.entity.Payment;
import com.example.elGrande.entity.User;
import com.example.elGrande.model.PaymentResponse;
import com.example.elGrande.model.UserInfo;
import com.example.elGrande.service.CampaignService;
import com.example.elGrande.service.PaymentService;
import com.example.elGrande.service.UserService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("api/payment/")
public class PaymentController {

    @Autowired
    private UserService userService;

    @Autowired
    private CampaignService campaignService;

    @Autowired
    private PaymentService paymentService;

    @PostMapping(value = "create-payment-intent")
    public ResponseEntity<?> createPaymentIntent(@RequestBody Payment payment) throws StripeException {
        Stripe.apiKey = "sk_test_51L8sK5LlNBHeDk8KMqkuAHFgZ2HI9hMbBU6pOceqvBQkQxf4NCT7VbjC34BSNaSopjAU0qXOeK5X7WNLDytLbUIn00CZcPDYRV";
        PaymentIntentCreateParams params =
                PaymentIntentCreateParams.builder()
                        .setAmount(payment.getValue().longValue())
                        .setCurrency(payment.getCurrency().toString())
                        .setAutomaticPaymentMethods(
                                PaymentIntentCreateParams.AutomaticPaymentMethods
                                        .builder()
                                        .setEnabled(true)
                                        .build()
                        )
//                        .setPaymentMethod("pm_card_visa")
                        .build();

        // Create a PaymentIntent with the order amount and currency
        PaymentIntent paymentIntent = PaymentIntent.create(params);

        PaymentResponse paymentResponse = new PaymentResponse(paymentIntent.getClientSecret());
        return ResponseEntity.ok(paymentResponse);
    }

    @PostMapping(value = "add-payment/{userId}/{campaignId}/{campaignUserId}")
    public void addPayment(@RequestBody Payment payment
            , @PathVariable Long userId
            , @PathVariable Long campaignId
            , @PathVariable Long campaignUserId) {
        userService.addPayment(payment, userId, campaignId, campaignUserId);
    }

    @GetMapping(value = "get-user-by-payment/{paymentId}")
    public ResponseEntity<?> getUserForPayment(@PathVariable Long paymentId) {
        Payment payment = paymentService.getPayment(paymentId);
        User userObj = (User) userService.loadUserByUsername(payment.getUser().getUsername());

        UserInfo userInfo = new UserInfo();
        userInfo.setId(userObj.getId());
        userInfo.setUsername(userObj.getUsername());

        return ResponseEntity.ok(userInfo);
    }

}
