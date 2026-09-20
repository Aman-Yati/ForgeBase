package com.forgebase.util;

import java.security.SecureRandom;
import java.time.Instant;
import java.util.Base64;

public class CuidGenerator {
    private static final SecureRandom random = new SecureRandom();
    private static final String ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz";
    private static final int LENGTH = 25;

    public static String generateCuid() {
        long timestamp = Instant.now().toEpochMilli();
        String timestampPart = encodeBase36(timestamp);
        String randomPart = generateRandomString(LENGTH - timestampPart.length() - 1);
        return "c" + timestampPart + randomPart;
    }

    private static String encodeBase36(long value) {
        if (value == 0) return "0";
        StringBuilder sb = new StringBuilder();
        while (value > 0) {
            sb.append(ALPHABET.charAt((int) (value % 36)));
            value /= 36;
        }
        return sb.reverse().toString();
    }

    private static String generateRandomString(int length) {
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(ALPHABET.charAt(random.nextInt(ALPHABET.length())));
        }
        return sb.toString();
    }
}
